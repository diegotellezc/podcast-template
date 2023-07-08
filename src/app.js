const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const handlebars = require("express-handlebars");
const lessMiddleware = require("less-middleware");
const path = require("path");
const axios = require("axios");

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
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "'unsafe-inline'", "https://jsonblob.com"],
      "img-src": ["'self'", "https: data:"],
      "media-src": ["'self'", "*"],
    },
  })
);

app.use(
  lessMiddleware(path.join(__dirname, "/less/"), {
    debug: true,
    dest: path.join(__dirname, "/public/"),
    force: true,
  })
);

app.use(express.static(path.join(__dirname, "/public")));
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

// Ruta para el proxy
app.get("/audio-proxy", async (req, res, next) => {
  try {
    const audioUrl = req.query.url; // La URL del archivo de audio se pasa como parámetro en la consulta

    // Realiza la solicitud al archivo de audio utilizando axios
    const response = await axios.get(audioUrl, { responseType: "stream" });

    // Configura los encabezados adecuados en la respuesta
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Content-Length", response.headers["content-length"]);

    // Transmite el contenido del archivo de audio al cliente
    response.data.pipe(res);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
