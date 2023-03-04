const express = require('express')
const { _findOrCreate } = require('../controllers/brand.controller')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _update, _findOne } = require('../controllers/equipment.controller')
const { verifyUser, verifyAdmin } = require('../middleware/authjwt')
const maintenanceController = require('../controllers/maintenance.controller')

const router = express.Router()

const baseUrl = 'equipment'

function createDataBrand(name) {
    return { name, type: baseUrl }
}

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const newBrand = createDataBrand(req.body.brand)

        const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

        const brand = findBrand || createBrand;

        const data = { ...req.body, brandId: brand.id }

        delete data.brand;

        await _create(data, _transaction)

        _transaction.commit()

        return res.status(201).json('Se ha creado el equipo correctamente.')
    } catch (error) {
        _transaction.rollback()

        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find/:id`, verifyUser, async (req, res) => {
    try {
        const equipment = await _findOne(req.params.id)

        if (!equipment) return res.status(404).json('No se encontró el equipo.')

        return res.status(200).json(equipment)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const equipments = await _findAll()

        return res.status(200).json(equipments)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/update`, verifyAdmin, async (req, res) => {
    const _transaction = await transaction();

    try {
        const foundEquipment = await _findOne(req.body.id, _transaction)

        if (!foundEquipment) return res.status(400).json(`El equipo no existe.`)

        let data = req.body;

        const { brand } = data;

        delete data.brand;

        if (brand) {
            const newBrand = createDataBrand(brand)

            const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

            const _brand = findBrand || createBrand;

            data = { ...req.body, brandId: _brand.id }
        }

        await _update(data, _transaction)

        _transaction.commit()

        return res.status(200).json('El equipo se actualizo correctamente correctamente.')
    } catch (error) {
        _transaction.rollback()

        return res.status(500).json(error.message)
    }
})

router.delete(`/${baseUrl}/destroy`, verifyAdmin, async (req, res) => {
    const _transaction = await transaction();

    try {
        const equipmentId = req.body.id

        const row = await _findOne(equipmentId, _transaction)

        if (!row) return res.status(404).json('El equipo no fue encontrado.')

        await row.destroy()

        const where = { equipmentId }

        await maintenanceController._destroyWhere(where, _transaction)

        _transaction.commit()

        return res.status(200).json('El equipo se elimino correctamente correctamente.')
    } catch (error) {
        _transaction.rollback()

        return res.status(500).json(error.message);
    }
})

module.exports = router;