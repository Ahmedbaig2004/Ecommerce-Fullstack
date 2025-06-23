const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const verifyUser = (req, res, next) => {
    const token = req.cookies.uid; 
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SIGN);
        if (verified.role !== "user") {
            return res.status(403).json({ message: "Access Denied. User only!" });
        }
        req.body.userId=verified.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};


module.exports = verifyUser;
