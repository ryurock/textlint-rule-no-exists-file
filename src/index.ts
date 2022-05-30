import { TxtNode } from "@textlint/ast-node-types";
import { TextlintRuleContext, TextlintRuleModule } from "@textlint/types";
const fs = require("fs");

import * as path from "path";

export interface Options {
    allows?: string[];
}

const report: TextlintRuleModule<Options> = (context: TextlintRuleContext, options: Options = {}) => {
    const allows = options.allows || [];
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Link](node: TxtNode) {
            // アンカーは無視する
            let matched = node.url.match(/^#/g);
            if (matched) return;
            // git の Current URL または 相対パス以外は無視する
            matched = node.url.match(/^(\.\/|\/(.*))/g);
            if (!matched) return;

            const filePath = context.getFilePath();
            if (filePath == null) return;

            const currentPath = process.env.PWD;
            if (currentPath == null) return;

            // 相対パスの場合
            if (node.url.match(/^\.\//g)) {
                const fileBasePath = path.dirname(filePath);
                // アンカー(#) 以降を除去する
                const resolvePath = path.join(fileBasePath, (node.url as string).replace(/#(.*)/g, ''));
                if (fs.existsSync(resolvePath) !== false) return;

                const text = getSource(node); // Get text
                const isIgnored = allows.some(allow => text.includes(allow));
                if (isIgnored) return;

                const ruleError = new RuleError(`相対パスのファイルが存在しませんでした Link: ${text}`);
                return report(node, ruleError);
            }

            // Root Path 指定の場合
            if (node.url.match(/^\/(.*)/g)) {
                // アンカー(#) 以降を除去する
                const resolvePath = path.join(currentPath, (node.url as string).replace(/#.*/g, ''));
                // ファイルが存在した場合
                if (fs.existsSync(resolvePath)) return;

                const text = getSource(node); // Get text
                const isIgnored = allows.some(allow => text.includes(allow));
                if (isIgnored) return;

                const ruleError = new RuleError(`ファイルが存在しませんでした Link: ${text}`);
                return report(node, ruleError);
            }
        }
    }
};

export default report;