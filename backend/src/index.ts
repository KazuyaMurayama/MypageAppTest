import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getDirname } from './utils/path.js';

const __dirname = getDirname(import.meta.url);

// 環境変数を読み込み
dotenv.config({ path: resolve(__dirname, '../../.env.development') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Firebase Admin初期化
try {
  const serviceAccountPath = resolve(__dirname, '../../config/firebase-admin-key.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET
  });

  console.log('✓ Firebase Admin initialized successfully');
} catch (error) {
  console.error('✗ Firebase Admin initialization failed:', error);
}

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    firebase: admin.apps.length > 0 ? 'connected' : 'disconnected'
  });
});

// API v1 ルート
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Mypage App API v1',
    version: '1.0.0'
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
