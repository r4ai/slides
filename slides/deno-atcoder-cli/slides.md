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

Ref: https://github.com/r4ai/deno-atcoder-cli?tab=readme-ov-file#quick-start

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

# 技術スタック

---

# Cliffy

- CLI Framework
  - タブ補完の自動生成
  - ヘルプコマンドの自動生成

<<< @/snippets/cliffy.ts ts

---

# Cliffy

```sh
$ deno run -A ./cliffy.ts --help

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
