import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { router } from "./routes";
import "./routes/send-mail";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet({ hsts: false }));
app.use(
  helmet.hsts({
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  })
);
app.enable("trust proxy");

app.use((req, res, next) => {
  if (
    req.secure ||
    req.headers["x-forwarded-proto"] === "https" ||
    process.env.NODE_ENV === "development"
  ) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});
// app.use(cors({
// 	methods: ["GET", "POST"],
// 	origin: ['https://vanessamakestudio.vercel.app', 'http://localhost:5500'],
// }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite de 5 requisições por IP
  validate: false,
});
app.use("/send-mail", limiter);

app.use("/", router);

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Route for /
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = Number(process.env.PORT) || 8080;
// const PORT = 3000;

async function bootstrap() {
  app.listen(PORT, () => {
    console.info(`index.js:${process.pid}:Listening on ${PORT}`);
  });
}

bootstrap();
