import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getDirname } from '../utils/path.js';
import { COLLECTIONS, type User, type Applicant } from '../firestore/schema.js';

const __dirname = getDirname(import.meta.url);

// 環境変数を読み込み
dotenv.config({ path: resolve(__dirname, '../../../.env.development') });

// Firebase Admin初期化
const serviceAccountPath = resolve(__dirname, '../../../config/firebase-admin-key.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();

/**
 * テストユーザーのパスワード（開発環境のみ）
 */
const TEST_PASSWORD = 'Test1234!';

/**
 * シードデータ
 */
const seedUsers = [
  {
    email: 'applicant-test@example.com',
    password: TEST_PASSWORD,
    role: 'applicant' as const,
    displayName: '応募者テスト'
  },
  {
    email: 'agent-test@example.com',
    password: TEST_PASSWORD,
    role: 'agent' as const,
    displayName: 'エージェントテスト'
  }
];

const seedApplicant = {
  name: '応募者 太郎',
  name_kana: 'オウボシャ タロウ',
  phone: '090-1234-5678',
  postal_code: '100-0001',
  address: '東京都千代田区千代田1-1',
  birth_date: admin.firestore.Timestamp.fromDate(new Date('1990-01-01')),
  gender: 'male' as const,
  work_history: `
■ 株式会社ABC（2015年4月 - 2020年3月）
職種: Webエンジニア
業務内容: ECサイトの開発・運用

■ 株式会社XYZ（2020年4月 - 現在）
職種: フルスタックエンジニア
業務内容: SaaS製品の開発
  `.trim(),
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  certifications: ['基本情報技術者試験', 'AWS Certified Solutions Architect - Associate'],
  education: '〇〇大学 工学部 情報工学科 卒業（2015年3月）',
  self_pr: '5年以上のWeb開発経験があり、フロントエンドからバックエンドまで幅広く対応できます。特にReactとNode.jsを得意としており、チーム開発にも積極的に貢献できます。',
  desired_salary: 5000000,
  desired_location: '東京都',
  desired_occupation: 'フルスタックエンジニア',
  status: 'new' as const
};

/**
 * メイン処理
 */
async function seed() {
  console.log('🌱 Starting seed process...\n');

  try {
    // 1. Firebase Authenticationにユーザーを作成
    for (const user of seedUsers) {
      console.log(`Creating user: ${user.email}...`);

      try {
        // 既存ユーザーをチェック
        const userRecord = await auth.getUserByEmail(user.email);
        console.log(`  ✓ User already exists (uid: ${userRecord.uid})`);

        // Firestoreのusersドキュメントを更新
        const userDoc: User = {
          uid: userRecord.uid,
          email: user.email,
          role: user.role,
          created_at: admin.firestore.Timestamp.now(),
          updated_at: admin.firestore.Timestamp.now()
        };

        await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set(userDoc, { merge: true });
        console.log(`  ✓ Firestore user document updated`);

        // 応募者の場合、applicantsドキュメントも作成/更新
        if (user.role === 'applicant') {
          const applicantData: Applicant = {
            ...seedApplicant,
            user_id: userRecord.uid,
            email: user.email,
            created_at: admin.firestore.Timestamp.now(),
            updated_at: admin.firestore.Timestamp.now()
          };

          const applicantsQuery = await db.collection(COLLECTIONS.APPLICANTS)
            .where('user_id', '==', userRecord.uid)
            .limit(1)
            .get();

          if (!applicantsQuery.empty) {
            const docId = applicantsQuery.docs[0]!.id;
            await db.collection(COLLECTIONS.APPLICANTS).doc(docId).update({
              ...applicantData,
              updated_at: admin.firestore.Timestamp.now()
            });
            console.log(`  ✓ Applicant document updated`);
          } else {
            await db.collection(COLLECTIONS.APPLICANTS).add(applicantData);
            console.log(`  ✓ Applicant document created`);
          }
        }

      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          // ユーザーが存在しない場合は新規作成
          const userRecord = await auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.displayName
          });
          console.log(`  ✓ User created (uid: ${userRecord.uid})`);

          // Firestoreのusersドキュメントを作成
          const userDoc: User = {
            uid: userRecord.uid,
            email: user.email,
            role: user.role,
            created_at: admin.firestore.Timestamp.now(),
            updated_at: admin.firestore.Timestamp.now()
          };

          await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set(userDoc);
          console.log(`  ✓ Firestore user document created`);

          // 応募者の場合、applicantsドキュメントも作成
          if (user.role === 'applicant') {
            const applicantData: Applicant = {
              ...seedApplicant,
              user_id: userRecord.uid,
              email: user.email,
              created_at: admin.firestore.Timestamp.now(),
              updated_at: admin.firestore.Timestamp.now()
            };

            await db.collection(COLLECTIONS.APPLICANTS).add(applicantData);
            console.log(`  ✓ Applicant document created`);
          }
        } else {
          throw error;
        }
      }

      console.log('');
    }

    console.log('✅ Seed process completed successfully!\n');
    console.log('Test Credentials:');
    console.log('─────────────────────────────────────');
    console.log('Applicant:');
    console.log(`  Email: ${seedUsers[0]!.email}`);
    console.log(`  Password: ${TEST_PASSWORD}`);
    console.log('');
    console.log('Agent:');
    console.log(`  Email: ${seedUsers[1]!.email}`);
    console.log(`  Password: ${TEST_PASSWORD}`);
    console.log('─────────────────────────────────────\n');

  } catch (error) {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  }

  process.exit(0);
}

// 実行
seed();
