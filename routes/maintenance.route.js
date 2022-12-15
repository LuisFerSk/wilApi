const express = require('express')
const { _create, _findAll, _destroy } = require('../controllers/maintenance.controller')
const { verifyUser } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'maintenance'

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    try {
        const equipment_user = await _create(req.body)

        return res.status(201).json({
            status: 'success',
            message: `El mantenimiento fue agregado correctamente.`,
            info: equipment_user
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const equipment_users = await _findAll()

        return res.status(200).json({
            status: 'success',
            message: 'la información de los mantenimientos se consultaron correctamente correctamente.',
            info: equipment_users
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.delete(`/${baseUrl}/destroy`, verifyUser, async (req, res) => {
    try {
        const result = await _destroy(req.body.id)

        return res.status(200).json({
            status: 'success',
            message: 'El mantenimiento se elimino correctamente correctamente.',
            result
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;