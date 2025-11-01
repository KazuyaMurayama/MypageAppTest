# Issue #7: Firebase Hostingへのデプロイ（開発環境）

## 背景 / 目的
Walking Skeletonが完成したため、Firebase Hostingにデプロイして動作確認を行う。デプロイフローを確立することで、継続的なデプロイとチーム全体での動作確認が可能になる。

- **依存**: #4, #6
- **ラベル**: `infra`, `deployment`, `phase-0`

## スコープ / 作業項目

### Firebase Hosting設定
- [ ] Firebase CLI インストール
- [ ] firebase init hosting 実行
- [ ] public ディレクトリ設定（dist/）
- [ ] ビルドコマンド設定

### ビルド設定
- [ ] 本番ビルドコマンド（npm run build）確認
- [ ] 環境変数の本番設定
- [ ] ビルド成果物の確認

### デプロイ
- [ ] firebase deploy --only hosting 実行
- [ ] デプロイURL確認
- [ ] 本番環境での動作確認

### ドキュメント
- [ ] デプロイ手順のドキュメント化
- [ ] ロールバック手順のドキュメント化

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Firebase CLI がインストールされ、firebase init hosting が完了している
- [ ] ビルドコマンド（npm run build）が成功し、dist/ディレクトリにビルド成果物が生成される
- [ ] Firebase Hosting にデプロイされ、デプロイURLでアクセスできる
- [ ] デプロイされたURLでログイン画面が表示され、ログイン機能が動作する
- [ ] 本番ビルドで環境変数が正しく読み込まれ、Firebase APIキーが設定されている
- [ ] デプロイ手順がdocs/またはREADME.mdにドキュメント化されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
