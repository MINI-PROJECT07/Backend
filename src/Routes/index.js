const express = require("express");
const router = express.Router();


router.use("/user",require("./user"));
router.use("/hospital",require("./hospital"));
router.use("/accident",require("./accident"));

module.exports = router