const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./database/db");
const requestMiddleware = require("./middleware/request-log-middleware");
const userRouter = require("./router/user");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const corsOption = {
    origin: ["http://localhost:3000", "*",],
    credentials: true,
  };

// DB--------------------------------------------------------------
connectDB();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
console.log("DB Connection");
// ----------------------------------------------------------------

app.use(express.json());
app.use(morgan("dev"));
app.use(requestMiddleware);
app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/user', userRouter);

app.listen(port, () => {
    console.log(port,"번 포트에서 대기 중");
});