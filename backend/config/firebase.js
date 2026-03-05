import { admin } from 'firebase-admin';
import { getFirestore } from 'firebase/firestore';
import ServiceAccount from './serviceAccountKey.json';

app = initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

const db = getFirestore(app)
const auth = app.auth();

export {app, db, auth}