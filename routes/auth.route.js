const express = require('express')
const { _create, _findByUsername } = require('../controllers/user.controller')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const foundUser = await _findByUsername(req.body.username)

        if (foundUser) {
            return res.status(400).json(`El usuario ${foundUser.username} ya existe.`)
        }

        const user = await _create(req.body)

        return res.status(201).json({
            status: 'success',
            message: `El usuario ${user.username} fue creado correctamente.`
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.post('/singin', async (req, res) => {
    try {
        const user = await _findByUsername(req.body.username)

        if (!user) return res.status(400).json('Usuario o contraseña incorrecta.')

        const match = bcrypt.compareSync(req.body.password, user.password)

        if (!match) return res.status(400).json('Usuario o contraseña incorrecta.')

        const dataToken = {
            id: user.id,
            username: user.username,
        }

        const token = jwt.sign(dataToken, SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            status: 'success',
            message: 'El usuario ha iniciado sesión correctamente.',
            token
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;