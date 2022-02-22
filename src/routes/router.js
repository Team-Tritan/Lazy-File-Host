const router = require("express").Router();

router.use("/", require("./index"));
router.use("/api/upload", require("./api/upload"));

module.exports = router;
