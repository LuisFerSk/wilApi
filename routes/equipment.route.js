const express = require('express')
const { _create, _findAll, _update, _destroy, _findOne } = require('../controllers/equipment.controller')
const { verifyUser } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'equipment'

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    try {
        const equipment = await _create(req.body)

        return res.status(201).json({
            status: 'success',
            message: `El equipo fue creado correctamente.`,
            info: equipment
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const equipments = await _findAll()

        return res.status(200).json({
            status: 'success',
            message: 'Los equipos se consultaron correctamente correctamente.',
            info: equipments
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/update`, verifyUser, async (req, res) => {
    try {
        const foundEquipment = await _findOne(req.body.id)

        if (!foundEquipment) {
            return res.status(400).json(`El equipo no existe.`)
        }

        const updatedRows = await _update(req.body)

        return res.status(200).json({
            status: 'success',
            message: 'El equipo se actualizo correctamente correctamente.',
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
            message: 'El equipo se elimino correctamente correctamente.',
            result
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;