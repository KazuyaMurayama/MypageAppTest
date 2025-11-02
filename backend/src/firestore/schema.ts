import admin from 'firebase-admin';

/**
 * Firestoreコレクション定義
 */

export interface User {
  uid: string;
  email: string;
  role: 'applicant' | 'agent';
  created_at: admin.firestore.Timestamp;
  updated_at: admin.firestore.Timestamp;
  last_login_at?: admin.firestore.Timestamp;
}

export interface Applicant {
  user_id: string;
  name: string;
  name_kana?: string;
  phone: string;
  postal_code?: string;
  address?: string;
  birth_date?: admin.firestore.Timestamp;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  email: string;
  work_history?: string;
  skills?: string[];
  certifications?: string[];
  education?: string;
  self_pr?: string;
  desired_salary?: number;
  desired_location?: string;
  desired_occupation?: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected' | 'withdrawn';
  created_at: admin.firestore.Timestamp;
  updated_at: admin.firestore.Timestamp;
}

/**
 * コレクション名定義
 */
export const COLLECTIONS = {
  USERS: 'users',
  APPLICANTS: 'applicants'
} as const;

/**
 * Security Rulesのテンプレート
 */
export const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 認証済みユーザーのみアクセス可能
    function isAuthenticated() {
      return request.auth != null;
    }

    // 自分のユーザードキュメントかチェック
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // エージェントロールかチェック
    function isAgent() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'agent';
    }

    // usersコレクション
    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || isAgent());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && isOwner(userId);
      allow delete: if isAuthenticated() && isOwner(userId);
    }

    // applicantsコレクション
    match /applicants/{applicantId} {
      allow read: if isAuthenticated() &&
                     (isOwner(resource.data.user_id) || isAgent());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() &&
                       (isOwner(resource.data.user_id) || isAgent());
      allow delete: if isAuthenticated() && isAgent();
    }
  }
}
`;
