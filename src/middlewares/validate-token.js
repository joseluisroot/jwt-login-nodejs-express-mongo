const jwt = require('jsonwebtoken');

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if (!token) return res.status(400).json({ error: 'no se ha enviado un token' }) //verificamos si se ha mandado un token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userID = verified.id //creamos una varible req usable en cualquier ruta con la id del usuario, para usarlo en una ruta la ruta debe tener el middleware
        next() // continuamos
    } catch (error) {
        res.status(401).json({error: 'desautorizado'}) //en este caso seria que el token se hubiera pasado el tiempo establecido
    }
}

module.exports = verifyToken;