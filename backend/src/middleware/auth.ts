import type { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// 認証済みユーザー情報を格納する型拡張
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        role?: string;
      };
    }
  }
}

/**
 * Firebase認証ミドルウェア
 * Authorizationヘッダーからトークンを検証し、request.userに情報を格納
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Authorizationヘッダーからトークンを取得
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: '認証トークンが必要です'
      });
      return;
    }

    const token = authHeader.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized',
        message: '認証トークンが無効です'
      });
      return;
    }

    // Firebaseトークンを検証
    const decodedToken = await admin.auth().verifyIdToken(token);

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

    // リクエストオブジェクトにユーザー情報を格納
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userData?.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      error: 'Unauthorized',
      message: '認証に失敗しました'
    });
  }
}

/**
 * ロールベース認証ミドルウェア
 * 指定されたロールを持つユーザーのみアクセスを許可
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: '認証が必要です'
      });
      return;
    }

    if (!req.user.role || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden',
        message: 'このリソースへのアクセス権限がありません'
      });
      return;
    }

    next();
  };
}
