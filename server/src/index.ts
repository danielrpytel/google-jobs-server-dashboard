import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Job_Posting_Routes from "./routes/Job_Posting_Routes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/job-postings", Job_Posting_Routes);

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
