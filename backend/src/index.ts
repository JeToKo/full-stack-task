import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";

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

let Books: BookData[] = [];

// Save new bok into collection
app.post('/book/save', async (req: Request, res: Response) => {
  try {
    const book:BookData = req.body;
    if (!book) {
      return res.status(404).send('Book Not Found!')
    }
    book.id = 'id' + (new Date()).getTime()
    Books.push(book)
    return res.sendStatus(200)
  } catch (error) {
    // Handle the error
    res.status(500).send('Internal Server Error');
  }
});

// Modify existing book in collection
app.post('/book/modify', async (req: Request, res: Response) => {
  try {
    const book:BookData = req.body;
    // Check if book exists
    if (!book.id) {
      return res.status(404).send('Book Not Found!')
    }
    // Modify book
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
  } catch (error) {
    // Handle the error
    res.status(500).send('Internal Server Error');
  }
});

// Delete existing book in collection
app.post('/book/delete', async (req: Request, res: Response) => {
  try {
    const book:BookData = req.body;
    // Check if book exists
    if (book.id === undefined){
      return res.status(404).send('Book Not Found!')
    }
    // Delete book
    Books  = Books.filter(item => item.id !== book.id);
    return res.sendStatus(200)
  } catch (error) {
    // Handle the error
    res.status(500).send('Internal Server Error');
}
});

app.get("/", (req: Request, res: Response) => {
    res.send(Books);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});