const express = require('express')
const { _findByUsername, _createSupport, _findAllSupport, _updatePassword } = require('../controllers/user.controller')
const { verifyAdmin, decodeToken } = require('../middleware/authjwt');

const router = express.Router()

const baseUrl = 'support'

router.post(`/${baseUrl}/create`, verifyAdmin, async (req, res) => {
    try {
        const foundUser = await _findByUsername(req.body.username)

        if (foundUser) {
            return res.status(400).json(`El usuario ${foundUser.username} ya existe.`)
        }

        const user = await _createSupport(req.body)

        return res.status(201).json({
            status: 'success',
            message: `El soporte ${user.username} fue creado correctamente.`,
            info: user
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyAdmin, async (req, res) => {
    try {
        const supports = await _findAllSupport()

        return res.status(200).json({
            status: 'success',
            message: 'Los soportes se consultaron correctamente correctamente.',
            info: supports
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/change-me-password`, verifyAdmin, async (req, res) => {
    try {
        const decryptedToken = decodeToken(req)

        const user = decryptedToken.info;

        const { id } = user;
        const { password } = req.body;

        const _user = { id, password }

        await _updatePassword(_user)

        return res.status(200).json({
            status: 'success',
            message: 'Se actualizo correctamente su contraseña.'
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/change-password`, verifyAdmin, async (req, res) => {
    try {
        await _updatePassword(req.body)

        return res.status(200).json({
            status: 'success',
            message: 'Se actualizo correctamente la contraseña del soporte.'
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;