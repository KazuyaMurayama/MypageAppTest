import { Router, type Request, type Response } from 'express';
import admin from 'firebase-admin';
import { authenticate } from '../middleware/auth.js';

const router = Router();

/**
 * POST /api/v1/auth/login
 * ログイン（Firebase Authenticationはクライアント側で処理）
 * このエンドポイントはトークン検証とユーザー情報取得のみ
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'idTokenが必要です'
      });
      return;
    }

    // Firebase IDトークンを検証
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Firestoreからユーザー情報を取得
    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      res.status(404).json({
        error: 'User Not Found',
        message: 'ユーザーが見つかりません'
      });
      return;
    }

    const userData = userDoc.data();

    // 最終ログイン日時を更新
    await userDoc.ref.update({
      last_login_at: admin.firestore.Timestamp.now(),
      updated_at: admin.firestore.Timestamp.now()
    });

    res.json({
      message: 'ログインに成功しました',
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: userData?.role,
        displayName: userData?.displayName || null
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);

    if (error.code === 'auth/id-token-expired') {
      res.status(401).json({
        error: 'Token Expired',
        message: 'トークンの有効期限が切れています'
      });
      return;
    }

    if (error.code === 'auth/invalid-id-token') {
      res.status(401).json({
        error: 'Invalid Token',
        message: 'トークンが無効です'
      });
      return;
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'ログイン処理に失敗しました'
    });
  }
});

/**
 * POST /api/v1/auth/logout
 * ログアウト（Firebase Authenticationはクライアント側で処理）
 * このエンドポイントはセッション無効化のプレースホルダー
 */
router.post('/logout', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    // 将来的にセッション管理を追加する場合はここで無効化
    // 現在はクライアント側でsignOut()を呼び出すのみ

    res.json({
      message: 'ログアウトに成功しました'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'ログアウト処理に失敗しました'
    });
  }
});

/**
 * GET /api/v1/auth/me
 * 現在ログイン中のユーザー情報を取得
 */
router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: '認証が必要です'
      });
      return;
    }

    // Firestoreから最新のユーザー情報を取得
    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      res.status(404).json({
        error: 'User Not Found',
        message: 'ユーザーが見つかりません'
      });
      return;
    }

    const userData = userDoc.data();

    res.json({
      user: {
        uid: req.user.uid,
        email: req.user.email,
        role: userData?.role,
        created_at: userData?.created_at,
        updated_at: userData?.updated_at,
        last_login_at: userData?.last_login_at
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'ユーザー情報の取得に失敗しました'
    });
  }
});

export default router;
