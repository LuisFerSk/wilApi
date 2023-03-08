const jwt = require('jsonwebtoken');
const { SECRET, ROLE_ADMINISTRATOR } = require('../config');
const { _findById } = require('../controllers/user.controller');

function decodeToken(req) {
    const token = req.headers['x-access-token'];

    if (!token) throw new Error('El token no existe.')

    if (typeof token !== "string") throw new Error('Token no valido')

    try {
        return jwt.verify(token, SECRET)
    }
    catch (err) {
        throw new Error('Token no valido')
    }
}

async function verifyUser(req, res, next = () => { }) {
    try {
        const { id } = decodeToken(req);

        const user = await _findById(id)

        if (!user) return res.status(400).json('El token ya expiro.')

        next()
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function verifyAdmin(req, res, next) {
    try {
        const { id } = decodeToken(req);

        const user = await _findById(id)

        if (!user) return res.status(400).json('El token ya expiro.')

        if (user.role !== ROLE_ADMINISTRATOR) return res.status(401).json('No tienes permisos para realizar esta acción.')

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