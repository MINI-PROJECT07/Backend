const {body} = require('express-validator');

const createNotificationHValidator = [
    body("hospital", "Hospital ID is required").exists(),
    body("accident", "Accident ID is required").exists(),
    body("date", "Invalid date").exists().isISO8601(),
]

module.exports = {createNotificationHValidator}