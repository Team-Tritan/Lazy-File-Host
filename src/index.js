"use strict";

const { createVerify } = require("crypto");
const express = require("express"),
  fileUpload = require("express-fileupload"),
  fs = require("fs"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  path = require("path"),
  _ = require("lodash"),
  e = require("express"),
  c = require("./config");

const app = express();

function nameThisBitch(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({
    message: "hi baby, do you wanna see my cock? uwu its a 12 incher",
  });
});

app.post("/upload/", (req, res) => {
  try {
    if (req.headers.key !== c.token) {
      return res
        .status(403)
        .send({ status: 403, message: "Invalid token, get fucked dumbass." });
    } else {
      if (!req.files) {
        res.status(404).send({
          status: 404,
          message: "No file uploaded, are you fucking stupid?",
        });
      } else {
        let x = req.files.sharex;
        let ext = path.extname(x.name);
        let name = nameThisBitch(10);
        let dir = c.dirs[Math.floor(Math.random() * c.dirs.length)];

        x.mv("./uploads/" + name + ext);
        //send response
        res.send({
          status: 200,
          message: "File just got uploaded!",
          url: dir + "/" + name + ext,
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
    console.error(`[ERROR] ${err.stack}`);
  }
});

app.get("/:dir/:file", (req, res) => {
  var path = __dirname + "/uploads/" + req.params.file;
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      res.status(404).sendFile(__dirname + "/public/404.png");
    } else {
      res.sendFile(__dirname + "/uploads/" + req.params.file);
    }
  });
});

app.listen(c.port, () => {
  console.log(`[~~Daddy~~] Listening for fat cocks on port ${c.port}`);
});
