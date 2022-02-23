"use strict";

const express = require("express"),
  fileUpload = require("express-fileupload"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  _ = require("lodash"),
  c = require("./config"),
  path = require("path"),
  app = express();

app
  .disable("x-powered-by")
  .set(`uwu-daddy?`, `very-uwu`)
  .use(
    fileUpload({
      createParentPath: true,
    })
  )
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .set("views", "pages")
  .use("/api/img/raw", express.static("uploads"))
  .set("view engine", "ejs")
  .use("/", require("./routes/router.js"))
  .listen(c.port, () => {
    console.log(`[~~Daddy~~] Listening for fat cocks on port ${c.port}`);
  });
