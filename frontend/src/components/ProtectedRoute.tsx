import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser, userData } = useAuth();

  // 未認証の場合はログインページにリダイレクト
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ロール制限がある場合はチェック
  if (allowedRoles && userData) {
    if (!allowedRoles.includes(userData.role)) {
      // ロールに応じて適切なダッシュボードにリダイレクト
      if (userData.role === 'agent') {
        return <Navigate to="/agent/dashboard" replace />;
      } else {
        return <Navigate to="/applicant/dashboard" replace />;
      }
    }
  }

  return <>{children}</>;
}
