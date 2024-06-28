---
theme: default
title: AtCoderのCLI ツールをDenoで作ってJSRに公開した話
layout: intro
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: M PLUS 2
---

# DenoでCLIを作ってJSRに公開した話

---

# 目次

- 作ったものの紹介
- 技術スタック
- JSRはいいぞ

---

# 機能

- コンテスト情報を取得し、問題のテンプレートを生成
- テストコードの生成・実行
- コンフィグによる柔軟な設定（TypeScriptで記述）
- タブ補完（fish, zsh, bash）

```sh
$ atcoder gen abc123
contests/abc123/
├── A/
│  ├── a.py
│  ├── metadata.json
│  └── tests
├── B/
... (略)
```

Ref: <https://github.com/r4ai/deno-atcoder-cli?tab=readme-ov-file#quick-start>

---

# インストール方法

- グローバルにインストールする：

  ```sh
  deno install --global --force \
       --allow-net \
       --allow-read \
       --allow-write \
       --allow-env \
       --allow-run \
       --name=atcoder \
       jsr:@r4ai/atcoder-cli
  ```

- お試しで実行だけする：

  ```sh
  deno run -A jsr:@r4ai/atcoder-cli --help
  ```

---
layout: center
---

# 技術スタック

---

# Cliffy

- CLI Framework
  - タブ補完の自動生成（fish, zsh, bash）
  - ヘルプコマンドの自動生成

<<< @/snippets/cliffy.ts ts

---

# Cliffy

```sh
$ deno run -A https://raw.githubusercontent.com/r4ai/slides/main/slides/deno-atcoder-cli/snippets/cliffy.ts --help

Usage:   hello
Version: 0.1.0

Description:

  A simple hello world program.

Options:

  -h, --help     - Show this help.
  -V, --version  - Show the version number for this program.

Commands:

  completions  - Generate shell completions.
  world        - Prints 'Hello World!'
```

---

# その他

- Linter: `deno lint`
- Formatter: `deno fmt`
- Test: `deno test`

すべてDenoに同梱されている！ -> 開発の初動が早い

Prettier? ESLint? Biome? Vitest? Jest? 悩まずに済む！

---
layout: center
---

# JSRはいいぞ

---

# JSR

- Native TypeScript support
  - 直接`.ts`をアップロード出来る
- ECMAScript modules only
  - CommonJS は窓から投げ捨てよう
  - Dual package 対応のための、面倒なビルド設定からの解放
- JSR is a superset of npm
  - `npx jsr add @r4ai/hoge` で、package.jsonからも使用可能
- JSDocからのAPIドキュメント自動生成
- OIDC ID Tokenを利用した、GitHub Actions での自動デプロイ

---

# JSR へアップロードする最小構成

```ts
// mod.ts
export const hello = (name: string = "World"): string => `Hello, ${name}!`;
```

```json
// jsr.json or deno.json
{
  "name": "@r4ai/hello",
  "version": "1.0.0",
  "exports": "./mod.ts"
}
```

デプロイの実行：

```sh
deno deploy
```

- 非常にシンプルで、簡単に公開できる！
- ビルドも不要！

---

# 自動デプロイ

```sh
name: Publish

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # The OIDC ID token is used for authentication with JSR.    
    steps:
      - uses: actions/checkout@v4
      - run: npx jsr publish
```

- `jsr.json` の `version` が変更された時に公開される
- Changeset との組み合わせの例：<https://github.com/r4ai/remark-embed/blob/main/.github/workflows/changeset-version.yml>

---

# まとめ

- Deno で CLI を作ると楽
- JSR はいいぞ
  - npmで面倒だった点が解消されている

---
layout: center
---

# ご清聴ありがとうございました
