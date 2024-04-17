const express = require("express");
const router = express.Router();
const {
    createBloodDonor,
    getBloodDonors,
    getBloodDonorsNearest,
    getBloodDonorInfo,
    updateBloodDonor,
    deleteBloodDonor,
} = require("../Controllers/bloodDonorController");
const { fetchUser } = require("../Middlewares/fetchUser");
const { body } = require("express-validator");

router.post(
    "/createBloodDonor",
    [
        body("name").isString().isLength({ min: 3 }),
        body("phoneNo").isString().isLength({ min: 10 }),
        body("bloodGroup").isString().isLength({ min: 2 }),
        body("age").isNumeric(),
        body("permanantLocation").isObject(),
        body("address").isString().isLength({ min: 3 }),
    ],
    fetchUser,
    createBloodDonor
);
router.post("/getBloodDonors", getBloodDonors);
router.post(
    "/getBloodDonorsNearest",
    [body("latitude").isNumeric(), body("longitude").isNumeric()],
    getBloodDonorsNearest
);
router.post(
    "/getBloodDonorInfo",
    [body("id").isString().isLength({ min: 3 })],
    getBloodDonorInfo
);
router.put("/updateBloodDonor", updateBloodDonor);
router.delete("/deleteBloodDonor", deleteBloodDonor);

module.exports = router;
