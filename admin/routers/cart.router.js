const express = require("express");
const { getusercart, updatecart, addtocart } = require("../controllers/cart.controller.js");
const verifyuser = require("../middlewares/VerifyUser.js");
const router = express.Router();

router.get("/getcart",verifyuser, getusercart);
router.post("/addcart",verifyuser, addtocart);
router.post("/update",verifyuser, updatecart);

module.exports = router;
