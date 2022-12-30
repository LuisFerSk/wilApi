const express = require('express')
const { _findOrCreate } = require('../controllers/brand.controller')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _update, _destroy, _findOne } = require('../controllers/equipment.controller')
const { verifyUser } = require('../middleware/authjwt')
const maintenanceController = require('../controllers/maintenance.controller')

const router = express.Router()

const baseUrl = 'equipment'

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const [findBrand, createBrand] = await _findOrCreate(req.body.brand, _transaction)

        if (findBrand) {
            req.body = { ...req.body, brand_id: findBrand.id }
        } else {
            req.body = { ...req.body, brand_id: createBrand.id }
        }

        const equipment = await _create(req.body, _transaction)

        const _equipment = await _findOne(equipment.id)

        await _transaction.commit()

        return res.status(201).json({
            status: 'success',
            message: `El equipo fue creado correctamente.`,
            info: _equipment
        })
    } catch (error) {
        await _transaction.rollback()

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
    const _transaction = await transaction();

    try {
        const foundEquipment = await _findOne(req.body.id)

        if (!foundEquipment) {
            return res.status(400).json(`El equipo no existe.`)
        }

        const [findBrand, createBrand] = await _findOrCreate(req.body.brand, _transaction)

        if (findBrand) {
            req.body = { ...req.body, brand_id: findBrand.id }
        } else {
            req.body = { ...req.body, brand_id: createBrand.id }
        }

        await _update(req.body)

        const _equipment = await _findOne(req.body.id)

        await _transaction.commit()

        return res.status(200).json({
            status: 'success',
            message: 'El equipo se actualizo correctamente correctamente.',
            info: _equipment
        })
    } catch (error) {
        await _transaction.rollback()

        return res.status(500).json(error.message);
    }
})

router.delete(`/${baseUrl}/destroy`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const equipment_id = req.body.id

        await _destroy(equipment_id, _transaction)

        const where = { equipment_id }

        await maintenanceController._destroyWhere(where, _transaction)

        return res.status(200).json({
            status: 'success',
            message: 'El equipo se elimino correctamente correctamente.',
        })
    } catch (error) {
        await _transaction.rollback()

        return res.status(500).json(error.message);
    }
})

module.exports = router;