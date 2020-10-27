const isEmailExist = async (req, res, next) => {
        await User.findOne({ email: req.body.email });
    if (isEmailExist) {
    return res.status(400).json({ error: "Email ya registrado" });
    }
}

module.exports = isEmailExist