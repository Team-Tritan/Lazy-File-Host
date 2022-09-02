"use strict";

const router = require("express").Router(),
  fs = require("fs"),
  path = require("path"),
  c = require("../config");

function getPath(dir) {
  return path.resolve(process.cwd(), dir);
}

router
  .get("/", (req, res) => {
    let data = {
      dirs: c.dirs,
    };
    return res.render("sus.ejs", data);
  })

  .get("/:dir/:file", (req, res) => {
    if (!c.dirs.includes(req.params.dir)) {
      return res.status(403).send({
        error: true,
        status: 404,
        message: "Resource not found, get fucked.",
      });
    }

    if (!fs.existsSync(`${getPath("./uploads")}/${req.params.file}`)) {
      return res.status(404).send({
        error: true,
        status: 404,
        message: "Resource not found, get fucked.",
      });
    }

    fs.access(getPath("./uploads"), fs.F_OK, (err) => {
      if (err) {
        res.status(404).sendFile((getPath("./public"), "/404.png"));
      } else {
        return res.render("img.ejs", {
          name: req.params.file,
          ext: path.extname(req.params.file),
        });
      }
    });
  });

module.exports = router;
