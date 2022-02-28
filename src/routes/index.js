"use strict";

const router = require("express").Router(),
  fs = require("fs"),
  path = require("path"),
  c = require("../config");

router
  .get("/", (req, res) => {
    return res.json({
      sex: "brought to you by Dylan the e-whore."
    });
  })

  .get("/:dir/:file", (req, res) => {
    if (!c.dirs.includes(req.params.dir)) {
      return res.status(403).send({
        error: true,
        status: 404,
        message: "Directory not found, get fucked.",
      });
    }

    const localpath = path.resolve(process.cwd(), "./uploads");

    if (!fs.existsSync(`${localpath}/${req.params.file}`)) {
      return res.status(404).send({
        error: true,
        status: 404,
        message: "File not found, get fucked.",
      });
    }

    fs.access(localpath, fs.F_OK, (err) => {
      if (err) {
        res
          .status(404)
          .sendFile(path.resolve(process.cwd(), "./public/404.png"));
      } else {
        return res.render("img.ejs", {
          name: req.params.file,
        });
      }
    });
  });

module.exports = router;
