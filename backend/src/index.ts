import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT

app.get("/", (req: Request, res: Response) => {
    res.send('{"title":"Eragon", "author":Paolini, "description":Dragon stuff, "other: Very good book}');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});