const jwt = require('jsonwebtoken');

const express = require('express')
const { _findByUsername, _createAdministrator, _findById } = require('../controllers/user.controller')
const bcrypt = require('bcrypt')
const { SECRET } = require('../config');
const { decodeToken } = require('../middleware/authjwt');

const router = express.Router()

router.post('/signup-administrator', async (req, res) => {
    try {
        const foundUser = await _findByUsername(req.body.username)

        if (foundUser) {
            return res.status(400).json(`El usuario ${foundUser.username} ya existe.`)
        }

        const user = await _createAdministrator(req.body)

        return res.status(201).json(`El usuario ${user.username} fue creado correctamente.`)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.post('/signin', async (req, res) => {
    try {
        const user = await _findByUsername(req.body.username)

        if (!user) return res.status(400).json('Usuario o contraseña incorrecta.')

        const match = bcrypt.compareSync(req.body.password, user.password)

        if (!match) return res.status(400).json('Usuario o contraseña incorrecta.')

        const { id, username, role } = user

        const basicUser = {
            username,
            role,
        }

        const dataToken = {
            id,
            ...basicUser
        }

        const token = jwt.sign(dataToken, SECRET, { expiresIn: '1d' });

        return res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get('/verify-token', async (req, res) => {
    let decryptedToken;

    try {
        decryptedToken = decodeToken(req);

        const { id } = decryptedToken;

        const user = await _findById(id)

        if (!user) return res.status(400).json('El token ya expiro.')

        res.status(200).json(decryptedToken)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router;