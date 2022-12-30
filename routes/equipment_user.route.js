const express = require('express')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _findOne, _destroy, _update } = require('../controllers/equipment_user.controller')
const { verifyUser } = require('../middleware/authjwt')
const maintenanceController = require('../controllers/maintenance.controller')

const router = express.Router()

const baseUrl = 'equipment-user'

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    try {
        const equipment_user = await _create(req.body)

        return res.status(201).json({
            status: 'success',
            message: `El usuario fue creado correctamente.`,
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
            message: 'Los usuarios se consultaron correctamente correctamente.',
            info: equipment_users
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/update`, verifyUser, async (req, res) => {
    try {
        const foundEquipment_user = await _findOne(req.body.id)

        if (!foundEquipment_user) {
            return res.status(400).json(`El usuario no existe.`)
        }

        await _update(req.body)

        const equipment_user = await _findOne(req.body.id)

        return res.status(200).json({
            status: 'success',
            message: 'El usuario se actualizo correctamente correctamente.',
            info: equipment_user
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.delete(`/${baseUrl}/destroy`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const equipment_user_id = req.body.id;

        await _destroy(equipment_user_id, _transaction)

        const where = { equipment_user_id }

        await maintenanceController._destroyWhere(where, _transaction)

        return res.status(200).json({
            status: 'success',
            message: 'El usuario se elimino correctamente correctamente.',
        })
    } catch (error) {
        await _transaction.rollback()

        return res.status(500).json(error.message);
    }
})

module.exports = router;