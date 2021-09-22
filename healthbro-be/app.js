require("dotenv").config();
require("./Database/db");
const express = require("express"),
  http = require("http"),
  cors = require("cors"),
  authRoute = require("./route/authRoute"),
  apiRoute = require("./route/apiRoute");
const isTokenValid = require("./middleware/isTokenValid");
const app = express();
const port = process.env.PORT || "3333";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("server running");
});

app.use("/auth", authRoute);
app.use("/api", apiRoute);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
