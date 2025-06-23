const express=require("express");
const {registerUser,loginUser,loginAdmin}=require("../controllers/user.controller.js")
const verifyUser = require("../middlewares/VerifyUser.js")

const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/admin",loginAdmin)
router.get("/verify-token", verifyUser, (req, res) => {

    res.json({ success: true, message: "Token is valid" });
});
router.post("/logout", (req, res) => {
    res.clearCookie("uid", { httpOnly: true, secure: false, sameSite: "strict" });
    return res.json({ success: true, message: "Logged out successfully" });
});
module.exports = router;