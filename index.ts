import express from 'express';
import { firestoreDB } from './db';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

const postmanUsersCollection = firestoreDB.collection('postmanUsers');

app.post('/users', (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.json({ error: 'Faltan datos, el usuario debe tener un nombre y un email' });
	}
	const userId = uuidv4();
	const userData = {
		name: req.body.name,
		email: req.body.email,
		id: userId,
	};
	postmanUsersCollection
		.doc(userId)
		.set(userData)
		.then(() => res.json(userData))
		.catch((err) => res.json(err));
});

app.get('/users', (req, res) => {
	const users = [];
	postmanUsersCollection
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => users.push(doc.data()));
			res.json(users);
		})
		.catch((err) => res.json(err));
});

app.get('/users/:userId', (req, res) => {
	const { userId } = req.params;
	const userDoc = postmanUsersCollection.doc(userId);
	userDoc
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.json({ error: 'No se encuentra el usuario' });
			} else {
				res.json(doc.data());
			}
		})
		.catch((err) => res.json(err));
});

/* El método PUT se utiliza para actualizar un recurso en su totalidad. */
/* El método PATCH se utiliza para realizar modificaciones parciales en un recurso. */
app.patch('/users/:userId', (req, res) => {
	const { userId } = req.params;
	const userDoc = postmanUsersCollection.doc(userId);
	userDoc
		.update(req.body)
		.then(() => {
			res.json({ message: `Usuario ${userId} actualizado exitosamente!` });
		})
		.catch(() => {
			res.json({ error: `No se pudo actualizar el usuario` });
		});
});

app.delete('/users/:userId', (req, res) => {
	const { userId } = req.params;
	const userDoc = postmanUsersCollection.doc(userId);
	userDoc
		.delete()
		.then(() => res.json({ message: `Usuario ${userId} eliminado exitosamente!` }))
		.catch(() => {
			res.json({ error: `No se pudo eliminar el usuario` });
		});
});

app.listen(PORT, () => console.log(`-------- Server is running on port ${PORT} -------- `));
