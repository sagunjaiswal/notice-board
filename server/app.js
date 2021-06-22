const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//setup express
const app = express();

//middlewares
app.use(express.json()); //to read json objects to request
//activation of cors in our express app
app.use(cors());
// app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname));

//set up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("MONGODB CONNECTED at the time: " + new Date());
  }
);

//body parser
app.use(express.json());

//CORS ISSUE FIXING
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-COntrol-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//set up routes
app.use("/users", require("./routes/UserRoute"));
app.use("/notice", require("./routes/NoticeRoute"));

module.exports = app;
