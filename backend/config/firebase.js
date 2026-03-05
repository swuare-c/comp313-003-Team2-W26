import { admin } from 'firebase-admin';
import { getFirestore } from 'firebase/firestore';
import ServiceAccount from './serviceAccountKey.json';

app = initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

const db = getFirestore(app)

export {app, db}