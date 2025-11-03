import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';

interface ApplicantProfile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  name_kana: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  postal_code: string;
  address: string;
  nearest_station: string;
  education: string;
  work_experience: string;
  skills: string[];
  certifications: string[];
  desired_industry: string;
  desired_job_type: string;
  desired_location: string;
  desired_annual_income: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ApplicantProfile() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [profile, setProfile] = useState<ApplicantProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!userData) {
      navigate('/login');
      return;
    }

    fetchProfile();
  }, [userData, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const user = auth.currentUser;
      if (!user) {
        throw new Error('認証が必要です');
      }

      const idToken = await user.getIdToken();

      const response = await fetch('http://localhost:3000/api/v1/applicants/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'プロフィール情報の取得に失敗しました');
      }

      const data = await response.json();
      setProfile(data.applicant);
    } catch (err: any) {
      console.error('Profile fetch error:', err);
      setError(err.message || 'プロフィール情報の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/applicant/dashboard');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">読み込み中...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
        <button className="btn btn-primary" onClick={handleBack}>
          ダッシュボードに戻る
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          プロフィール情報が見つかりません
        </div>
        <button className="btn btn-primary" onClick={handleBack}>
          ダッシュボードに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-person-vcard me-2"></i>
          プロフィール詳細
        </h2>
        <button className="btn btn-outline-primary" onClick={handleBack}>
          <i className="bi bi-arrow-left me-2"></i>
          戻る
        </button>
      </div>

      {/* 基本情報 */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-person-badge me-2"></i>
            基本情報
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="text-muted small">氏名</label>
              <p className="mb-0 fw-bold">{profile.name}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">フリガナ</label>
              <p className="mb-0">{profile.name_kana}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">メールアドレス</label>
              <p className="mb-0">{profile.email}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">電話番号</label>
              <p className="mb-0">{profile.phone}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">生年月日</label>
              <p className="mb-0">{formatDate(profile.date_of_birth)}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">性別</label>
              <p className="mb-0">{profile.gender}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 住所情報 */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">
            <i className="bi bi-geo-alt me-2"></i>
            住所情報
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="text-muted small">郵便番号</label>
              <p className="mb-0">{profile.postal_code}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">最寄り駅</label>
              <p className="mb-0">{profile.nearest_station}</p>
            </div>
            <div className="col-12 mb-3">
              <label className="text-muted small">住所</label>
              <p className="mb-0">{profile.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 学歴・職歴 */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">
            <i className="bi bi-mortarboard me-2"></i>
            学歴・職歴
          </h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="text-muted small">最終学歴</label>
            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{profile.education}</p>
          </div>
          <div className="mb-0">
            <label className="text-muted small">職務経歴</label>
            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{profile.work_experience}</p>
          </div>
        </div>
      </div>

      {/* スキル・資格 */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">
            <i className="bi bi-award me-2"></i>
            スキル・資格
          </h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="text-muted small">スキル</label>
            <div className="d-flex flex-wrap gap-2">
              {profile.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span key={index} className="badge bg-primary">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="mb-0 text-muted">スキル情報なし</p>
              )}
            </div>
          </div>
          <div className="mb-0">
            <label className="text-muted small">資格</label>
            <div className="d-flex flex-wrap gap-2">
              {profile.certifications && profile.certifications.length > 0 ? (
                profile.certifications.map((cert, index) => (
                  <span key={index} className="badge bg-success">
                    <i className="bi bi-patch-check me-1"></i>
                    {cert}
                  </span>
                ))
              ) : (
                <p className="mb-0 text-muted">資格情報なし</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 希望条件 */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">
            <i className="bi bi-star me-2"></i>
            希望条件
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="text-muted small">希望業種</label>
              <p className="mb-0">{profile.desired_industry}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">希望職種</label>
              <p className="mb-0">{profile.desired_job_type}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">希望勤務地</label>
              <p className="mb-0">{profile.desired_location}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="text-muted small">希望年収</label>
              <p className="mb-0 fw-bold text-success">
                {formatCurrency(profile.desired_annual_income)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ステータス */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="text-muted small">ステータス</label>
              <p className="mb-0">
                <span className={`badge ${profile.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                  {profile.status === 'active' ? 'アクティブ' : profile.status}
                </span>
              </p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="text-muted small">登録日</label>
              <p className="mb-0">{formatDate(profile.created_at)}</p>
            </div>
            <div className="col-md-4">
              <label className="text-muted small">最終更新日</label>
              <p className="mb-0">{formatDate(profile.updated_at)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-5">
        <button className="btn btn-outline-primary" onClick={handleBack}>
          <i className="bi bi-arrow-left me-2"></i>
          ダッシュボードに戻る
        </button>
        <button className="btn btn-primary" disabled>
          <i className="bi bi-pencil me-2"></i>
          編集（近日公開）
        </button>
      </div>
    </div>
  );
}
