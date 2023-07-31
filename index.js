const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config");
const cors = require("cors");
const app = express();
const db = require("./models");

const { PurchaseHistories, User } = db;

const routes = require("./routes");
const corsOptions = {
  origin: ["*"],
  exposedHeaders: ["Authorization, Cookie", "Content-type"],
  allowedHeaders: ["Authorization, Cookie", "Content-type"],
  credentials: true,
  methods: "POST, GET, PUT, PATCH, DELETE, OPTIONS",
};
app.use(cors(corsOptions));
app.options("*", cors());

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

const baseUrl = `/api/v1`;

app.use(`${baseUrl}`, routes);

app.listen(config.app_port, () => {
  console.log(`Server is Running on ${config.app_port}`);
});

