const express = require('express')
const { _findOrCreate } = require('../controllers/brand.controller')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _update, _destroy, _findOne, _findByPlate } = require('../controllers/printer_scanner.controller')
const { verifyUser, verifyAdmin } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'printer_scanner'

function normalizeErrors(error, res) {
    const errorMessage = error.message;

    if (errorMessage.includes(`${baseUrl}_cc`) && errorMessage.includes('ORA-00001')) return res.status(500).json('La cédula ya ha sido registrada para otro usuario.')

    if (errorMessage.includes(`${baseUrl}_serial`) && errorMessage.includes('ORA-00001')) return res.status(500).json('El serial ya ha sido registrado para otro equipo.')

    if (errorMessage.includes(`${baseUrl}_license_plate`) && errorMessage.includes('ORA-00001')) return res.status(500).json('La placa ya ha sido registrada para otro equipo.')

    return res.status(500).json(errorMessage.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.'));
}

function createDataBrand(name) {
    return { name, type: baseUrl }
}

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const newBrand = createDataBrand(req.body.brand)

        const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

        const brand = findBrand || createBrand;

        const data = { ...req.body, brand_id: brand.id }

        const equipment = await _create(data, _transaction)

        const _equipment = await _findOne(equipment.id)

        _transaction.commit()

        return res.status(201).json({
            status: 'success',
            message: `La impresora o scanner fue creado correctamente.`,
            info: _equipment
        })
    } catch (error) {
        _transaction.rollback()

        normalizeErrors(error, res)
    }
})

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const equipments = await _findAll()

        return res.status(200).json({
            status: 'success',
            message: 'Las impresoras y scanners se consultaron correctamente correctamente.',
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

        if (!foundEquipment) return res.status(400).json(`La impresora o scanner no existe.`)

        let data = req.body;

        const { brand } = data;

        if (brand) {
            const newBrand = createDataBrand(req.body.brand)

            const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

            const brand = findBrand || createBrand;

            data = { ...req.body, brand_id: brand.id }
        }

        await _update(data)

        const _equipment = await _findOne(req.body.id)

        _transaction.commit()

        return res.status(200).json({
            status: 'success',
            message: 'La impresora o scanner se actualizo correctamente correctamente.',
            info: _equipment
        })
    } catch (error) {
        _transaction.rollback()

        normalizeErrors(error, res)
    }
})

router.delete(`/${baseUrl}/destroy`, verifyAdmin, async (req, res) => {
    try {
        const equipment_id = req.body.id

        await _destroy(equipment_id)

        return res.status(200).json({
            status: 'success',
            message: 'La impresora o scanner se elimino correctamente correctamente.',
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;