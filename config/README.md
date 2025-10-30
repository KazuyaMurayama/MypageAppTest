# Config ディレクトリ

このディレクトリには機密情報を含む設定ファイルを配置します。

## ⚠️ 重要な注意事項

**このディレクトリ内の`.json`ファイルは絶対にGitにコミットしないでください。**

`.gitignore`により自動的に除外されますが、念のため確認してください。

## 必要なファイル

### firebase-admin-key.json

Firebase Admin SDKの秘密鍵ファイルです。

**取得方法:**
1. [Firebaseコンソール](https://console.firebase.google.com/project/kazuya-project-e42f1/settings/serviceaccounts/adminsdk)にアクセス
2. 「新しい秘密鍵の生成」をクリック
3. ダウンロードしたファイルを`firebase-admin-key.json`にリネームしてこのディレクトリに配置

**配置場所:**
```
config/firebase-admin-key.json
```

## セキュリティ

- このディレクトリの`.json`ファイルは機密情報です
- 共有する場合は安全な方法（暗号化、セキュアな転送）を使用してください
- 本番環境では環境変数として管理することを推奨します

## チーム内での共有方法

1. **1Password/LastPassなどのパスワードマネージャーを使用**
2. **暗号化zipファイルで共有**
3. **AWS Secrets ManagerやGoogle Secret Managerを使用**

直接Slack/メール等で送信しないでください。
