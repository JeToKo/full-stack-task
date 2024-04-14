import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT

interface BookData {
    title: string;
    author: string;
    description: string;
    information: string;
  }

const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL
};
app.use(cors(corsOptions));

let submittedData: BookData[] = [{
  title: 'Eragon',
  author: 'Creola Katherine Johnson',
  description: 'mathematician',
  information: 'funny'
}, {
  title: 'brisingr',
  author: 'Mario José Molina-Pasquel Henríquez',
  description: 'chemist',
  information: 'funny'
}, {
  title: 'Harry potter',
  author: 'Mohammad Abdus Salam',
  description: 'physicist',
  information: 'funny'
}, {
  title: 'Minimi',
  author: 'Percy Lavon Julian',
  description: 'chemist',
  information: 'funny'  
}, {
  title: 'Aku ankka',
  author: 'Subrahmanyan Chandrasekhar',
  description: 'astrophysicist',
  information: 'funny'
}];

app.get("/", (req: Request, res: Response) => {
    res.send(submittedData);
});


app.post('/save', (req: Request, res: Response) => {
  const {  title, author, description, information}:BookData = req.body;
  console.log(title, author, description, information )
  if (!title) {
    return res.status(404).send('User Not Found!')
  }

  return res.status(200).json(title)
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});