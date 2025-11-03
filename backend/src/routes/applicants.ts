import { Router, type Request, type Response } from 'express';
import admin from 'firebase-admin';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/v1/applicants/me
 * 認証済み応募者の詳細情報を取得
 */
router.get('/me', authenticate, requireRole('applicant'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: '認証が必要です'
      });
      return;
    }

    const db = admin.firestore();

    // applicantsコレクションからuser_idで検索
    const applicantsSnapshot = await db.collection('applicants')
      .where('user_id', '==', req.user.uid)
      .limit(1)
      .get();

    if (applicantsSnapshot.empty) {
      res.status(404).json({
        error: 'Not Found',
        message: '応募者情報が見つかりません'
      });
      return;
    }

    const applicantDoc = applicantsSnapshot.docs[0];
    if (!applicantDoc) {
      res.status(404).json({
        error: 'Not Found',
        message: '応募者情報が見つかりません'
      });
      return;
    }

    const applicantData = applicantDoc.data();

    // Timestampを ISO 8601 文字列に変換
    const formatTimestamp = (timestamp: any) => {
      if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toISOString();
      }
      return timestamp;
    };

    res.json({
      applicant: {
        id: applicantDoc.id,
        user_id: applicantData.user_id,
        email: applicantData.email,
        name: applicantData.name,
        name_kana: applicantData.name_kana,
        phone: applicantData.phone,
        date_of_birth: formatTimestamp(applicantData.date_of_birth),
        gender: applicantData.gender,
        postal_code: applicantData.postal_code,
        address: applicantData.address,
        nearest_station: applicantData.nearest_station,
        education: applicantData.education,
        work_experience: applicantData.work_experience,
        skills: applicantData.skills,
        certifications: applicantData.certifications,
        desired_industry: applicantData.desired_industry,
        desired_job_type: applicantData.desired_job_type,
        desired_location: applicantData.desired_location,
        desired_annual_income: applicantData.desired_annual_income,
        status: applicantData.status,
        created_at: formatTimestamp(applicantData.created_at),
        updated_at: formatTimestamp(applicantData.updated_at)
      }
    });
  } catch (error) {
    console.error('Get applicant error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: '応募者情報の取得に失敗しました'
    });
  }
});

/**
 * GET /api/v1/applicants/:id
 * エージェント向け: 特定の応募者情報を取得
 */
router.get('/:id', authenticate, requireRole('agent'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'IDが必要です'
      });
      return;
    }

    const db = admin.firestore();
    const applicantDoc = await db.collection('applicants').doc(id).get();

    if (!applicantDoc.exists) {
      res.status(404).json({
        error: 'Not Found',
        message: '応募者が見つかりません'
      });
      return;
    }

    const applicantData = applicantDoc.data();

    // Timestampを ISO 8601 文字列に変換
    const formatTimestamp = (timestamp: any) => {
      if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toISOString();
      }
      return timestamp;
    };

    res.json({
      applicant: {
        id: applicantDoc.id,
        user_id: applicantData?.user_id,
        email: applicantData?.email,
        name: applicantData?.name,
        name_kana: applicantData?.name_kana,
        phone: applicantData?.phone,
        date_of_birth: formatTimestamp(applicantData?.date_of_birth),
        gender: applicantData?.gender,
        postal_code: applicantData?.postal_code,
        address: applicantData?.address,
        nearest_station: applicantData?.nearest_station,
        education: applicantData?.education,
        work_experience: applicantData?.work_experience,
        skills: applicantData?.skills,
        certifications: applicantData?.certifications,
        desired_industry: applicantData?.desired_industry,
        desired_job_type: applicantData?.desired_job_type,
        desired_location: applicantData?.desired_location,
        desired_annual_income: applicantData?.desired_annual_income,
        status: applicantData?.status,
        created_at: formatTimestamp(applicantData?.created_at),
        updated_at: formatTimestamp(applicantData?.updated_at)
      }
    });
  } catch (error) {
    console.error('Get applicant by ID error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: '応募者情報の取得に失敗しました'
    });
  }
});

/**
 * GET /api/v1/applicants
 * エージェント向け: 応募者一覧を取得
 */
router.get('/', authenticate, requireRole('agent'), async (req: Request, res: Response): Promise<void> => {
  try {
    const db = admin.firestore();
    const { limit = '50', offset = '0', status } = req.query;

    let query = db.collection('applicants').orderBy('created_at', 'desc');

    // ステータスフィルタ
    if (status && typeof status === 'string') {
      query = query.where('status', '==', status) as any;
    }

    // ページネーション
    const limitNum = parseInt(limit as string, 10);
    const offsetNum = parseInt(offset as string, 10);

    const snapshot = await query.limit(limitNum).offset(offsetNum).get();

    const formatTimestamp = (timestamp: any) => {
      if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toISOString();
      }
      return timestamp;
    };

    const applicants = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        user_id: data.user_id,
        email: data.email,
        name: data.name,
        name_kana: data.name_kana,
        phone: data.phone,
        status: data.status,
        created_at: formatTimestamp(data.created_at),
        updated_at: formatTimestamp(data.updated_at)
      };
    });

    res.json({
      applicants,
      total: snapshot.size,
      limit: limitNum,
      offset: offsetNum
    });
  } catch (error) {
    console.error('Get applicants error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: '応募者一覧の取得に失敗しました'
    });
  }
});

export default router;
