import { useState, type FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setUserData } = useAuth();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string>('');

  // バリデーション
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // メールアドレス必須チェック
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    // パスワード必須チェック
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ログイン処理
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Firebase Authenticationでログイン
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // IDトークンを取得
      const idToken = await userCredential.user.getIdToken();

      // バックエンドAPIにログイン情報を送信
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'ログインに失敗しました');
      }

      const data = await response.json();

      // ユーザー情報をローカルストレージに保存
      localStorage.setItem('user', JSON.stringify(data.user));

      // AuthContextにユーザー情報を設定
      setUserData(data.user);

      // ロールに応じてリダイレクト
      if (data.user.role === 'agent') {
        navigate('/agent/dashboard');
      } else {
        navigate('/applicant/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      // Firebaseエラーメッセージを日本語化
      if (error.code === 'auth/user-not-found') {
        setLoginError('ユーザーが見つかりません');
      } else if (error.code === 'auth/wrong-password') {
        setLoginError('パスワードが間違っています');
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('無効なメールアドレスです');
      } else if (error.code === 'auth/user-disabled') {
        setLoginError('このアカウントは無効化されています');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('ログイン試行回数が多すぎます。しばらくしてから再試行してください');
      } else {
        setLoginError(error.message || 'ログインに失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">人材エージェント</h2>
                <h3 className="h4">マイページシステム</h3>
                <p className="text-muted">ログイン</p>
              </div>

              {loginError && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isLoading}
                    placeholder="example@example.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    パスワード
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    placeholder="パスワードを入力"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ログイン中...
                    </>
                  ) : (
                    'ログイン'
                  )}
                </button>
              </form>

              <hr className="my-4" />

              <div className="alert alert-info mb-0" role="alert">
                <strong>テストアカウント:</strong>
                <div className="mt-2 small">
                  <div className="mb-2">
                    <strong>応募者:</strong><br />
                    applicant-test@example.com / Test1234!
                  </div>
                  <div>
                    <strong>エージェント:</strong><br />
                    agent-test@example.com / Test1234!
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
