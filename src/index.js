"use strict";

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config");

const app = express();

app
  .disable("x-powered-by")
  .use(fileUpload({ createParentPath: true }))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .set("views", "pages")
  .use("/api/content/raw", express.static("uploads"))
  .set("view engine", "ejs")
  .use("/", require("./routes/router.js"))
  .listen(config.port, () => {
    console.log(`[~~Daddy~~] Listening for fat cocks on port ${config.port}`);
  });
