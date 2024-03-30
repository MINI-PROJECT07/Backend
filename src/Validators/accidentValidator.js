const {body} = require('express-validator');


const createAccidentValidator = [
    body("location", "Location must be at least 5 characters long").isLength({
        min: 5,
        max: 100,
    }),
    body("latitude", "Invalid latitude").isDecimal(),
    body("longitude", "Invalid longitude").isDecimal(),
    body("description", "Description must be at least 5 characters long").isLength({
        min: 5,
        max: 500,
    }),
]


module.exports = { createAccidentValidator };