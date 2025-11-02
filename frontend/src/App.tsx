import { useState, useEffect } from 'react';
import { auth, db, storage } from './firebase';

function App() {
  const [firebaseStatus, setFirebaseStatus] = useState({
    auth: false,
    firestore: false,
    storage: false,
    backend: false
  });

  useEffect(() => {
    // Firebase接続テスト
    const testFirebaseConnection = async () => {
      try {
        // Auth確認
        const authStatus = auth !== null;

        // Firestore確認
        const firestoreStatus = db !== null;

        // Storage確認
        const storageStatus = storage !== null;

        // バックエンド確認
        try {
          const response = await fetch('http://localhost:3000/health');
          const data = await response.json();

          setFirebaseStatus({
            auth: authStatus,
            firestore: firestoreStatus,
            storage: storageStatus,
            backend: data.status === 'ok' && data.firebase === 'connected'
          });
        } catch (error) {
          setFirebaseStatus({
            auth: authStatus,
            firestore: firestoreStatus,
            storage: storageStatus,
            backend: false
          });
        }
      } catch (error) {
        console.error('Firebase connection test failed:', error);
      }
    };

    testFirebaseConnection();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">人材エージェントマイページシステム</h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">開発環境セットアップ確認</h5>
              <p className="card-text">
                Issue #1: 開発環境セットアップとFirebase初期化
              </p>

              <div className="mt-4">
                <h6>接続ステータス:</h6>
                <ul className="list-group">
                  <li className={`list-group-item d-flex justify-content-between align-items-center ${firebaseStatus.auth ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                    Firebase Authentication
                    <span className="badge bg-primary rounded-pill">
                      {firebaseStatus.auth ? '✓ 接続済み' : '✗ 未接続'}
                    </span>
                  </li>
                  <li className={`list-group-item d-flex justify-content-between align-items-center ${firebaseStatus.firestore ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                    Firebase Firestore
                    <span className="badge bg-primary rounded-pill">
                      {firebaseStatus.firestore ? '✓ 接続済み' : '✗ 未接続'}
                    </span>
                  </li>
                  <li className={`list-group-item d-flex justify-content-between align-items-center ${firebaseStatus.storage ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                    Firebase Storage
                    <span className="badge bg-primary rounded-pill">
                      {firebaseStatus.storage ? '✓ 接続済み' : '✗ 未接続'}
                    </span>
                  </li>
                  <li className={`list-group-item d-flex justify-content-between align-items-center ${firebaseStatus.backend ? 'list-group-item-success' : 'list-group-item-warning'}`}>
                    Backend API (Express + Firebase Admin)
                    <span className="badge bg-primary rounded-pill">
                      {firebaseStatus.backend ? '✓ 接続済み' : '✗ 未起動'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="alert alert-info mt-4" role="alert">
                <strong>次のステップ:</strong>
                <ul className="mb-0 mt-2">
                  <li>バックエンドを起動: <code>cd backend && npm run dev</code></li>
                  <li>フロントエンドを起動: <code>cd frontend && npm run dev</code></li>
                  <li>Issue #2: Firestoreデータベーススキーマ初期設定へ進む</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
