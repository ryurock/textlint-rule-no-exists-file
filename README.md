# textlint-rule-no-exists-file

リンクの相対パスと Current Root 指定のパスの存在をチェックする [textlint](https://github.com/textlint/textlint) ルールです。
# Installation

```bash
npm install @textlint-ja/textlint-rule-no-exists-file
```

# Getting Started

開発方法について

## textlint rule の対象リポジトリをマウントする

`docker-compose.yaml` でテストしたい対象のディレクトリを指定してマウントします。

```yaml
version: "3"
services:
  app:
    privileged: true
    container_name: "textlint-rule-no-exists-file"
    build:
      dockerfile: Dockerfile
      context: ./
    volumes:
      - ./:/app
      - node_modules_volume:/app/node_modules
      # マウント先を指定する
      - $HOME/path/to/path:/docker/path/to/path
```

## コンテナにログイン


```bash
docker compose exec app bash --login
```

## textlint-rule-no-exists-file をビルドする

```bash
npm run build
```

## マウントしたディレクトリに移動する


```bash
cd /docker/path/to/path
```

下記コマンドでルールをテストします


## textlint-rule-no-exists-file をテストする

```bash
npx textlint --rulesdir /app/lib/ docs/
```

## 注意事項

テスト対象のディレクトリの `.textlintrc` で `"textlint-rule-no-exists-file": true` を入れていると修正が反映されないのでご注意ください。

```
{
  "filters": {},
  "rules": {
    # false を指定すること
    "textlint-rule-no-exists-file": false
  }
}

```

# Build

`lib` 以下にコードが作成されます。

```bash
npm run build
```

# Test

```bash
npx textlint --rulesdir lib/ file.md -f pretty-error
```