"use strict";

const router = require("express").Router(),
  path = require("path");

router.use("/", require("./index"));
router.use("/api/upload", require("./api/upload"));

router.get("*", function (req, res, error) {
  return res.status(500).json({
    error: true,
    status: error ? "404" : "500",
    message: error ? "Page not found" : "Internal server error",
  });
});

module.exports = router;
