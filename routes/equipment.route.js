const express = require('express')
const { _findOrCreate } = require('../controllers/brand.controller')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _update, _destroy, _findOne, _findByPlate, _validate } = require('../controllers/equipment.controller')
const { verifyUser, verifyAdmin } = require('../middleware/authjwt')
const maintenanceController = require('../controllers/maintenance.controller')
const db = require('../models')

const router = express.Router()

const baseUrl = 'equipment'

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const [findBrand, createBrand] = await _findOrCreate(req.body.brand, _transaction)

        if (req.body.license_plate) {
            const findPlate = await _findByPlate(req.body.license_plate, _transaction)

            if (findPlate) throw Error('La placa del equipo ya esta registrada.')
        }

        let data;

        if (findBrand) {
            data = { ...req.body, brand_id: findBrand.id }
        } else {
            data = { ...req.body, brand_id: createBrand.id }
        }

        const equipment = await _create(data, _transaction)

        const _equipment = await _findOne(equipment.id)

        await _transaction.commit()

        return res.status(201).json({
            status: 'success',
            message: `El equipo fue creado correctamente.`,
            info: _equipment
        })
    } catch (error) {
        await _transaction.rollback()

        const errorMessage = error.message;

        if (errorMessage.includes('_cc)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('La cédula ya ha sido registrada para otro usuario.')
        }

        if (errorMessage.includes('_serial)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('El serial ya ha sido registrado para otro equipo.')
        }

        return res.status(500).json(errorMessage.split('Validation error: ').join('').replace('.', ''));
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

router.put(`/${baseUrl}/update`, verifyAdmin, async (req, res) => {
    const _transaction = await transaction();

    try {
        const foundEquipment = await _findOne(req.body.id)

        if (!foundEquipment) {
            return res.status(400).json(`El equipo no existe.`)
        }

        let data = req.body;

        if (data.license_plate) {
            const findPlate = await _findByPlate(data.license_plate, _transaction)

            if (findPlate) throw Error('La placa de la impresora o scanner ya esta registrada.')
        }

        const { brand } = data;

        if (brand) {
            const [findBrand, createBrand] = await _findOrCreate(brand, _transaction)

            if (findBrand) {
                data = { ...data, brand_id: findBrand.id }
            } else {
                data = { ...data, brand_id: createBrand.id }
            }
        }

        await _update(data)

        const _equipment = await _findOne(req.body.id)

        await _transaction.commit()

        return res.status(200).json({
            status: 'success',
            message: 'El equipo se actualizo correctamente correctamente.',
            info: _equipment
        })
    } catch (error) {
        await _transaction.rollback()

        const errorMessage = error.message;

        if (errorMessage.includes('_cc)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('La cédula ya ha sido registrada para otro usuario.')
        }

        if (errorMessage.includes('_serial)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('El serial ya ha sido registrado para otro equipo.')
        }

        return res.status(500).json(errorMessage.split('Validation error: ').join('').replace('.', ''));
    }
})

router.delete(`/${baseUrl}/destroy`, verifyAdmin, async (req, res) => {
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