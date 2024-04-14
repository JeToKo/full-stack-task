import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

interface BookData {
    title: string;
    author: string;
    description: string;
    information: string;
    id: string
  }

const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL
};
app.use(cors(corsOptions));

let Books: BookData[] = [{
  title: 'Eragon',
  author: 'Creola Katherine Johnson',
  description: 'mathematician',
  information: 'funny',
  id: "1"
}, {
  title: 'brisingr',
  author: 'Mario José Molina-Pasquel Henríquez',
  description: 'chemist',
  information: 'funny',
  id: "2"
}, {
  title: 'Harry potter',
  author: 'Mohammad Abdus Salam',
  description: 'physicist',
  information: 'funny',
  id: "3"
}, {
  title: 'Minimi',
  author: 'Percy Lavon Julian',
  description: 'chemist',
  information: 'funny',
  id: "4"
}, {
  title: 'Aku ankka',
  author: 'Subrahmanyan Chandrasekhar',
  description: 'astrophysicist',
  information: 'funny',
  id: "5"
}];

app.post('/save', async (req: Request, res: Response) => {
  const book:BookData = req.body;
  if (!book) {
    return res.status(404).send('Book Not Found!')
  }
  book.id = 'id' + (new Date()).getTime()
  Books.push(book)
  return res.sendStatus(200)
});

app.post('/modify', async (req: Request, res: Response) => {
  const book:BookData = req.body;
  if (!book.id) {
    return res.status(404).send('Book Not Found!')
  }
  Books = Books.map(obj =>
    obj.id === book.id ? { 
      ...obj, 
      title: book.title,
    author: book.author,
    description: book.description,
    information: book.information,
    } : obj
  );
  return res.sendStatus(200)
});


app.post('/delete', async (req: Request, res: Response) => {
  const book:BookData = req.body;
  if (book.id === undefined){
    return res.status(404).send('Book Not Found!')
  }
  Books  = Books.filter(item => item.id !== book.id);
  return res.sendStatus(200)
});


app.get("/", (req: Request, res: Response) => {
    res.send(Books);
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});