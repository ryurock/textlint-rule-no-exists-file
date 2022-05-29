"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var fs = require("fs");

var report = function report(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var allows = options.allows || [];
  var {
    Syntax,
    RuleError,
    report,
    getSource
  } = context;
  return {
    [Syntax.Link](node) {
      // アンカーは無視する
      var matched = node.url.match(/^#/g);
      if (matched) return; // git の Current URL または 相対パス以外は無視する

      matched = node.url.match(/^(\.\/|\/(.*))/g);
      if (!matched) return;
      var filePath = context.getFilePath();
      if (filePath == null) return;
      var currentPath = process.env.PWD;
      if (currentPath == null) return; // 相対パスの場合

      if (node.url.match(/^\.\//g)) {
        var fileBasePath = path.dirname(filePath);
        var resolvePath = path.join(fileBasePath, node.url);
        if (fs.existsSync(resolvePath)) return;
        var text = getSource(node); // Get text

        var isIgnored = allows.some(allow => text.includes(allow));
        if (isIgnored) return;
        var ruleError = new RuleError("\u76F8\u5BFE\u30D1\u30B9\u306E\u30D5\u30A1\u30A4\u30EB\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3067\u3057\u305F Link: ".concat(text));
        return report(node, ruleError); // Root Path 指定の場合
      } else if (node.url.match(/^\/(.*)/g)) {
        var _resolvePath = path.join(currentPath, node.url); // ファイルが存在した場合


        if (fs.existsSync(_resolvePath)) return;

        var _text = getSource(node); // Get text


        var _isIgnored = allows.some(allow => _text.includes(allow));

        if (_isIgnored) return;

        var _ruleError = new RuleError("\u30D5\u30A1\u30A4\u30EB\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3067\u3057\u305F Link: ".concat(_text));

        return report(node, _ruleError);
      }
    }

  };
};

var _default = report;
exports.default = _default;
//# sourceMappingURL=index.js.map