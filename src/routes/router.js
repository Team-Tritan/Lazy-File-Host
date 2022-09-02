"use strict";

const router = require("express").Router();

router.get("*", (req, res, next) => {
  res.set("~~uwu~~", "fuck me daddy");
  next();
});

router.use("/", require("./index"));
router.use("/api/upload", require("./api/upload"));

router.get("*", function (req, res, error) {
  return res.status(500).json({
    error: true,
    status: error ? "404" : "500",
    message: error ? "Content not found" : "Internal server error: " + error,
  });
});

module.exports = router;
