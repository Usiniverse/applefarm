import express from "express";
import morgan from "morgan";
import cors from "cors";
import { requestMiddleware } from "./middleware/request-log-middleware.js";
import { userRouter } from "./router/kakao.js";
// import passport from "passport";

const app = express();
const port = 3000;

const corsOption = {
    origin: ["http://localhost:3000", "*",],
    credentials: true,
  };

app.use(express.json());
app.use(morgan("dev"));
app.use(requestMiddleware);
app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/auth', userRouter);

app.listen(port, () => {
    console.log(port,"번 포트에서 대기 중");
});