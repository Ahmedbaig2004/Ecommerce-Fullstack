const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.uid; 

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SIGN);
        if (verified.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access Denied. Admin only!" });
        }
        req.admin = verified;
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = verifyAdmin;
