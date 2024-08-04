const express = require("express");
const router = express.Router();

const { signup, login, updateUserInfor, addToCart, getCart } = require("../controllers/userController");
const { addDestination, getAllDestinations, addComment, getComments, findAllDestinationByIDs } = require("../controllers/destinationController");
// user route
router.get("/getCart/:userID", getCart);
router.post("/login", login);
router.post("/signup", signup);
router.post("/updateUserInfor/", updateUserInfor)
router.post("/addToCart", addToCart)

//destination route
router.post("/addDestination", addDestination)
router.get("/getComment/:destinationID", getComments)
router.get("/getAllDestinations", getAllDestinations)
router.post("/addComment/:destinationID", addComment)
router.post("/findAllDestinationByIDs", findAllDestinationByIDs)


module.exports = router;