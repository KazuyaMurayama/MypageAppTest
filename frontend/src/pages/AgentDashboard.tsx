import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface User {
  uid: string;
  email: string;
  role: string;
}

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // ローカルストレージからユーザー情報を取得
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);

      // エージェントでない場合はログイン画面へ
      if (userData.role !== 'agent') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <span className="navbar-brand">エージェント管理画面</span>
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
                  <i className="bi bi-speedometer2 me-2"></i>
                  ダッシュボード
                </h2>
                <hr />
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">ログイン成功！</h4>
                  <p>エージェントとしてログインしました。</p>
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
                        <i className="bi bi-people display-4 text-primary"></i>
                        <h5 className="card-title mt-3">応募者一覧</h5>
                        <p className="card-text text-muted">応募者情報の管理</p>
                        <button className="btn btn-primary btn-sm" disabled>
                          近日公開 (Issue #19)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-search display-4 text-info"></i>
                        <h5 className="card-title mt-3">全文検索</h5>
                        <p className="card-text text-muted">スキル・職歴検索</p>
                        <button className="btn btn-info btn-sm text-white" disabled>
                          近日公開 (Issue #34)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-briefcase display-4 text-success"></i>
                        <h5 className="card-title mt-3">求人管理</h5>
                        <p className="card-text text-muted">求人情報の作成・編集</p>
                        <button className="btn btn-success btn-sm" disabled>
                          近日公開 (Issue #32)
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
