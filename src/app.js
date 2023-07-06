const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const handlebars = require("express-handlebars");

// Esta es nuestra aplicación
const app = express();

// Middlewares
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "connect-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "style-src-elem": ["'self'", "data:"],
      "script-src": ["'unsafe-inline'", "'self'"],
      "object-src": ["'none'"],
    },
  })
);
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "index",
  })
);

app.use("/", router);

module.exports = app;