import express from 'express';
import { firestoreDB } from './db';
import cors from 'cors';

const PORT = 3000; 

const app = express();
app.use(express.json());
app.use(cors());

const postmanUsersCollection = firestoreDB.collection('postmanUsers');

app.listen(PORT, () => console.log(`-------- Server is running on port ${PORT} -------- `));
