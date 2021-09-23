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
app.use(logger("dev"));

//compress all responses
//speed up the responses
app.use(compression());

app.get("/", (req, res, next) => {
  res.send("server running");
});

//require api route
app.use("/auth", require("./route/authRoute"));
app.use("/api", require("./route/apiRoute"));

//set up port, server run
const port = process.env.PORT || "3333";
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
