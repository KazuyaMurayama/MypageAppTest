import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const { userData: user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">応募者マイページ</span>
          <div className="d-flex">
            <span className="navbar-text text-white me-3">
              {user.email}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">
                  <i className="bi bi-person-circle me-2"></i>
                  ダッシュボード
                </h2>
                <hr />
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">ログイン成功！</h4>
                  <p>応募者としてログインしました。</p>
                  <hr />
                  <p className="mb-0">
                    <strong>UID:</strong> {user.uid}<br />
                    <strong>Email:</strong> {user.email}<br />
                    <strong>Role:</strong> {user.role}
                  </p>
                </div>

                <div className="row mt-4">
                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-person-vcard display-4 text-primary"></i>
                        <h5 className="card-title mt-3">プロフィール</h5>
                        <p className="card-text text-muted">個人情報の確認・編集</p>
                        <button className="btn btn-primary btn-sm" disabled>
                          近日公開 (Issue #10)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-file-earmark-text display-4 text-info"></i>
                        <h5 className="card-title mt-3">ファイル管理</h5>
                        <p className="card-text text-muted">履歴書・職務経歴書</p>
                        <button className="btn btn-info btn-sm text-white" disabled>
                          近日公開 (Issue #27)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-briefcase display-4 text-success"></i>
                        <h5 className="card-title mt-3">求人情報</h5>
                        <p className="card-text text-muted">紹介された求人を確認</p>
                        <button className="btn btn-success btn-sm" disabled>
                          近日公開 (Issue #35)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
