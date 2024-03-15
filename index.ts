import express from 'express';
import { firestoreDB } from './db';
import cors from 'cors';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const postmanUsersCollection = firestoreDB.collection('postmanUsers');

/* Fijarse si se le puede exigir que el body sea de cierta manera */
app.post('/users', (req, res) => {
	/* Ver de generar id aleatorio */
	postmanUsersCollection
		.doc(req.body.id)
		.set(req.body)
		.then(() => res.json({ id: req.body.id }));
});

app.get('/users', (req, res) => {
	postmanUsersCollection.get().then((snapshot) => snapshot.forEach((doc) => res.json(doc.data())));
});

app.get('/users/:userId', (req, res) => {
	const { userId } = req.params;
	const userDoc = postmanUsersCollection.doc(userId);
	userDoc.get().then((doc) => res.json(doc.data()));
});

/* FALTA PUT Y DELETE */

app.listen(PORT, () => console.log(`-------- Server is running on port ${PORT} -------- `));
