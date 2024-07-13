const express = require("express");
const router = express.Router();

const { signup, login, updateUserInfor, addToCart } = require("../controllers/userController");
const { addDestination, getAllDestinations, addComment, getComments } = require("../controllers/destinationController");
// user route
router.post("/login", login);
router.post("/signup", signup);
router.post("/updateUserInfor/", updateUserInfor)
router.post("/addToCart", addToCart)
//destination route
router.post("/addDestination", addDestination)
router.get("/getComment/:destinationID", getComments)
router.get("/getAllDestinations", getAllDestinations)
router.post("/addComment/:destinationID", addComment)


module.exports = router;