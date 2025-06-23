
const express= require("express");
const {addProduct,listProduct,showsingleProduct,removeProduct}=require("../controllers/product.controller.js")
const router = express.Router();
const upload = require("../middlewares/multer.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");


router.post("/add",verifyAdmin,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct);
router.post("/remove",verifyAdmin,removeProduct)
router.post("/single",verifyAdmin,showsingleProduct)
router.get("/list",listProduct);
router.post("/logout", (req, res) => {
    res.clearCookie("uid", {
        httpOnly: true,
        secure: false, // Set to true in production (HTTPS required)
        sameSite: "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
});
router.get("/verify-token", verifyAdmin, (req, res) => {
    if (!req.admin) {
        return res.status(403).json({ success: false, message: "Access denied. Admin only!" });
    }
    
    res.json({ success: true, message: "Token is valid", admin: req.admin });
})

module.exports=router;