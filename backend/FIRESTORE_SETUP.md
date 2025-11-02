# Firestore API有効化手順

## エラー

```
Cloud Firestore API has not been used in project kazuya-project-e42f1 before or it is disabled.
```

## 解決方法

### 1. Firebase ConsoleでFirestore APIを有効化

以下のURLにアクセスしてAPIを有効化してください:

https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=kazuya-project-e42f1

または

https://console.firebase.google.com/project/kazuya-project-e42f1/firestore

### 2. Firestoreデータベースの作成

1. Firebase Console (https://console.firebase.google.com/project/kazuya-project-e42f1/firestore) にアクセス
2. 「データベースを作成」をクリック
3. **本番モード**を選択（Security Rulesは後で設定）
4. ロケーションを選択（例: `asia-northeast1` - 東京）
5. 「有効にする」をクリック

### 3. シードデータの投入

APIが有効化されたら、以下のコマンドでテストデータを投入します:

```bash
cd backend
npm run seed
```

### 4. 期待される出力

```
🌱 Starting seed process...

Creating user: applicant-test@example.com...
  ✓ User created (uid: xxxxx)
  ✓ Firestore user document created
  ✓ Applicant document created

Creating user: agent-test@example.com...
  ✓ User created (uid: yyyyy)
  ✓ Firestore user document created

✅ Seed process completed successfully!

Test Credentials:
─────────────────────────────────────
Applicant:
  Email: applicant-test@example.com
  Password: Test1234!

Agent:
  Email: agent-test@example.com
  Password: Test1234!
─────────────────────────────────────
```

## Firestore Security Rules

シードデータ投入後、Firebase Consoleから以下のSecurity Rulesを設定してください:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 認証済みユーザーのみアクセス可能
    function isAuthenticated() {
      return request.auth != null;
    }

    // 自分のユーザードキュメントかチェック
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // エージェントロールかチェック
    function isAgent() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'agent';
    }

    // usersコレクション
    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || isAgent());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && isOwner(userId);
      allow delete: if isAuthenticated() && isOwner(userId);
    }

    // applicantsコレクション
    match /applicants/{applicantId} {
      allow read: if isAuthenticated() &&
                     (isOwner(resource.data.user_id) || isAgent());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() &&
                       (isOwner(resource.data.user_id) || isAgent());
      allow delete: if isAuthenticated() && isAgent();
    }
  }
}
```

## トラブルシューティング

### エラー: "API recently enabled"

APIを有効化した直後は、数分待ってから再度シードスクリプトを実行してください。

```bash
npm run seed
```

### エラー: "Permission denied"

Firebase Admin SDK秘密鍵が正しく配置されているか確認してください:

```bash
# config/firebase-admin-key.json が存在するか確認
ls -la config/
```
