require("dotenv").config();
require("./Database/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const logger = require("morgan");
const compression = require("compression");
const createError = require("http-errors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("combined"));

//compress all responses
//speed up the responses
app.use(compression());

app.get("/", (req, res, next) => {
  res.send("server running");
});

//require api route
app.use("/auth", require("./route/authRoute"));
app.use("/api", require("./route/apiRoute"));

//response 404 error if the route requesting is not exist
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
//return a json object with error message
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

//set up port for server to run
const port = process.env.PORT || "3333";
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
