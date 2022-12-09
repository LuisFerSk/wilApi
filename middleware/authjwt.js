const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const { _findById } = require('../controllers/user.controller');


function decodeToken(req) {
    const token = req.headers['x-access-token'];

    if (!token) throw new Error('El token no existe.')

    if (typeof token !== "string") throw new Error('Token no valido')

    let decryptedToken;

    try {
        decryptedToken = jwt.verify(token, SECRET)
    }
    catch (err) {
        throw new Error('Token no valido')
    }

    return {
        status: 'success',
        mensaje: 'Token válido',
        info: decryptedToken
    }
}

function verifyUser(req, res, next = () => { }) {
    let decryptedToken;

    try {
        decryptedToken = decodeToken(req);
    }
    catch (err) {
        throw res.status(500).json(err.message)
    }

    next()
}

async function verifyAdmin(req, res, next) {
    let decryptedToken;

    try {
        decryptedToken = decodeToken(req);
    }
    catch (err) {
        throw res.status(500).json(err.message)
    }

    const { info: { id } } = decryptedToken;

    try {
        const user = await _findById(req.body.id)

        if (!user) return res.status(400).json('El token no es correcto.')

        next()
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    decodeToken,
    verifyUser,
    verifyAdmin
}