const User = require("../models/User");

const isEmailExist = async (req, res, next) => {
        
    const emailVerification  = await User.findOne({ email: req.body.email });
    if (emailVerification) {
        return res.status(400).json({ error: "Email ya registrado" });
    }
    next();
}

module.exports = isEmailExist