const express = require("express");
const router = express.Router();

const { signup, login, updateUserInfor } = require("../controllers/userController");
const { addDestination, getAllDestinations } = require("../controllers/destinationController")
router.post("/login", login);
router.post("/signup", signup)
router.post("/addDestination", addDestination)
router.get("/getAllDestinations", getAllDestinations)
router.post("/updateUserInfor/", updateUserInfor)


module.exports = router;