import * as serviceAccount from './fbKey.json';
import * as admin from 'firebase-admin';

// Inicializar la aplicación de Firebase
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: 'https://apx-dwf-m6-56070-default-rtdb.firebaseio.com',
});

const firestoreDB = admin.firestore();

export { firestoreDB };
