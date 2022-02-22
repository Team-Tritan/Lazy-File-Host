"use strict";

const router = require("express").Router(),
  fs = require("fs"),
  path = require("path"),
  c = require("../config");

router
  .get("/", (req, res) => {
    return res.json({
      message: "hi baby, do you wanna see my cock?",
      PS: "its a 12 incher",
    });
  })

  .get("/:dir/:file", (req, res) => {
    if (!c.dirs.includes(req.params.dir)) {
      return res.status(403).send({
        status: 404,
        message: "Directory not found, get fucked.",
      });
    }

    const localpath = path.resolve(process.cwd(), "./uploads");

    fs.access(localpath, fs.F_OK, (err) => {
      if (err) {
        res
          .status(404)
          .sendFile(path.resolve(process.cwd(), "./public/404.png"));
      } else {
        res.sendFile(localpath + "/" + req.params.file);
      }
    });
  });

module.exports = router;
