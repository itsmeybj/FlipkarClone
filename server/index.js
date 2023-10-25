const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

//const dbConnect = require("./config/dbconnect");
const DefaultData = require("./dummy_data")

const userRouter = require("./routers/userRouter");
const paytmRouter = require("./routers/paytmRouter");
const { default: mongoose } = require("mongoose");

const app = express();

//dbConnect();
mongoose.connect(process.env.DATABASE_URL)
console.log('connected');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(cookieParser());

// app.use(express.static('public'))

app.use("/user", userRouter);
app.use("/", paytmRouter);

app.listen(PORT, () => {
  console.log(`we are listening from port ${PORT}`);
});

DefaultData();
