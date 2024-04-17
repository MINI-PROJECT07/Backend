const express = require("express");
const router = express.Router();


router.use("/user",require("./user"));
router.use("/hospital",require("./hospital"));
router.use("/accident",require("./accident"));
router.use("/bloodDonor",require("./bloodDonor"));

module.exports = router