const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const requestMiddleware = require("./middleware/request-log-middleware");
const userRouter = require("./router/kakao")

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
});

app.get('/auth', userRouter);

app.listen(port, () => {
    console.log(port,"번 포트에서 대기 중");
});