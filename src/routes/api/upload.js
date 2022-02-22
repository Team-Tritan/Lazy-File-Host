"use strict";

const router = require("express").Router(),
  path = require("path"),
  _ = require("lodash"),
  e = require("express"),
  c = require("../../config");

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

router.post("/", (req, res) => {
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

module.exports = router;
