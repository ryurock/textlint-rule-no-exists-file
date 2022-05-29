# textlint-rule-no-exists-file

文章内のリンクのファイルが存在するかを検出する [textlint](https://github.com/textlint/textlint) ルールです。

# Installation

```bash
npm install @textlint-ja/textlint-rule-no-exists-file
```

# Contributes

TDD で開発を進めて下さい。

```bash
npm test
```

## Build

`lib` 以下にコードが作成されます。

```bash
npm run build
```

## Rules Test

```bash
npx textlint --rulesdir lib/ file.md -f pretty-error
```