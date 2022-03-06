"use strict";

const router = require("express").Router(),
  path = require("path");

router.use("/", require("./index"));
router.use("/api/upload", require("./api/upload"));

function getPath(dir) {
  return path.resolve(process.cwd(), dir);
}

router.get("*", function (req, res, error) {
  return res.status(500).json({
    error: true,
    status: error ? "404" : "500",
    message: error ? "Sex not found" : "Internal server error: " + error,
  });
});

module.exports = router;
