# \[WIP\]関東学生スカッシュ連盟DXアプリ

関東学生スカッシュ連盟の大会運営を効率的に行うためのDX推進アプリです.

## Architecture

Clean Architectureで実装しています．

ディレクトリ構成

```txt
├ app # フロントエンド関係
│ ├ actions # Server Actions
│ │ ├ *
│ │ │ └ *.action.ts
│ │ └ schema # formのスキーマ定義
│ │ 　 └ *.schema.ts
│ ├ api # apiのルーティング
│ │ └ *
│ │ 　 └ route.ts
│ ├ * # pageのルーティング
│ │ └ page.tsx
│ ├ layout.tsx # デフォルトのlayout
│ └ page.tsx # ルートパスのルーティング
│
├ components # UIのパーツ
│ ├ form # form関連のUI
│ │ └ *.tsx
│ ├ table # テーブル関連のUI
│ │ └ *.tsx
│ └ ui # 汎用UI（主にshadcn/ui）
│ 　 └ *.tsx
│
├ domain # ドメイン層
│ ├ model # モデル層
│ │ └ *.model.ts
│ ├ repository # レポジトリ層のインターフェース
│ │ └ *.repo.ts
│ └ service # サービス層（ここにはrepositoryに依存しないロジックを書く）
│ 　 ├ auth.service.ts
│ 　 └ tweet.service.ts
│
├ infrastructure # インフラストラクチャ層
│ └ db # DB層
│ 　 ├ converters # DBモデルからドメイン層のモデルに変換
│ 　 └ repository # レポジトリ層で変換
│
├ prisma
│ ├ data # seed用のデータファイル
│ ├ seed # seedのロジック
│ │ └ *.seed.ts
│ ├ schema.prisma
│ └ seed.ts # seedの実行ファイル
│
├ registry # レジストリ層（ここでドメイン層とインフラストラクチャ層の依存性を逆転する）
│ └ repository.ts
│
└ usecase # ユースケース層
　 └ *
　 　 └ *.usecase.ts
```

## Getting Started

### ライブラリをインストール

```sh
$ npm install
```

### 環境変数を追加

```sh
$ touch .env
```

`.env`に以下を記述

```txt
DATABASE_URL=<データベースのURL>
NEXT_PUBLIC_SUPABSE_API_KEY=<SupabaseのAPIキー>
NEXT_PUBLIC_ORIGIN=<自身のOrigin(localなら`http://localhost:3000`)>

// 以下はX（Twitter）のアクセストークン，APIキー
X_ACCESS_TOKEN=
X_ACCESS_TOKEN_SECRET=
X_API_KEY=
X_API_KEY_SECRET=
```

### データベースに初期データを挿入

```sh
$ npx prisma migrate dev --name init
$ npx prisma db seed -- --preview-feature
```

### 開発サーバーを起動

```sh
$ npm run dev
```

### Format, Lint

```sh
$ npm run lint
$ npm run fix # if you need format
```

### Run test

```sh
$ npm run test
```

### Build

```sh
$ npm run build
```

### 本番サーバーを起動

```sh
$ npm run start
```

### Reset Database

```sh
$ npx prisma migrate reset
```
