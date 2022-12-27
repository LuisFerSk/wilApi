const express = require('express')
const { _findByUsername, _createSupport, _findAllSupport } = require('../controllers/user.controller')
const { verifyAdmin } = require('../middleware/authjwt');

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

module.exports = router;