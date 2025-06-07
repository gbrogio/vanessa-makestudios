import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { router } from "./routes";
import './routes/send-mail';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	methods: ["GET", "POST"],
	origin: ['https://vanessamakestudio.vercel.app', 'http://localhost:5500'],
}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 5, // Limite de 5 requisições por IP
	validate: false,
});
app.use(limiter);

app.use("/", router)

app.get("/", async (req, res) => {
	res.send("<p>Hello World!</p>");
});

const NUM_FORKS = Number(process.env.CLUSTER_WORKERS) || 1;

const PORT = Number(process.env.PORT) || 8080;
// const PORT = 3000;

async function bootstrap() {
	app.listen(PORT, () => {
		console.info(`index.js:${process.pid}:Listening on ${PORT}`);
	});
}

bootstrap();
