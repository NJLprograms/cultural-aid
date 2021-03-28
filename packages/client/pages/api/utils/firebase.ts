import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from 'service-account.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export const firebase = admin;
