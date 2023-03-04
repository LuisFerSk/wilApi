const express = require('express')
const { _findByUsername, _createSupport, _findAllSupport, _updatePassword, _findById } = require('../controllers/user.controller')
const { verifyAdmin, decodeToken } = require('../middleware/authjwt');

const router = express.Router()

const baseUrl = 'support'

router.post(`/${baseUrl}/create`, verifyAdmin, async (req, res) => {
    try {
        const foundUser = await _findByUsername(req.body.username)

        if (foundUser) return res.status(400).json(`El usuario ${foundUser.username} ya existe.`)

        await _createSupport(req.body)

        return res.status(201).json('Se ha creado el usuario correctamente.')
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyAdmin, async (req, res) => {
    try {
        const supports = await _findAllSupport()

        return res.status(200).json(supports)
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

        return res.status(200).json('Se actualizo correctamente su contraseña.')
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/change-password`, verifyAdmin, async (req, res) => {
    try {
        await _updatePassword(req.body)

        return res.status(200).json('Se actualizo correctamente la contraseña del soporte.')
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.delete(`/${baseUrl}/destroy`, verifyAdmin, async (req, res) => {
    try {
        const row = await _findById(req.body.id)

        if (!row) return res.status(404).json('El suporte no fue encontrado.')

        await row.destroy()

        return res.status(200).json('El suporte se elimino correctamente correctamente.')
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;