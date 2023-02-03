const express = require('express')
const { _findOrCreate } = require('../controllers/brand.controller')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _update, _destroy, _findOne, _findByPlate } = require('../controllers/printer_scanner.controller')
const { verifyUser, verifyAdmin } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'printer_scanner'

router.post(`/${baseUrl}/create`, verifyUser, async (req, res) => {
    const _transaction = await transaction();

    try {
        const newBrand = { name: req.body.brand, type: 'printer_scanner' }

        const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

        if (req.body.license_plate) {
            const findPlate = await _findByPlate(req.body.license_plate, _transaction)

            if (findPlate) throw Error('La placa de la impresora o scanner ya esta registrada.')
        }

        const data = { ...req.body, brand_id: findBrand.id ?? createBrand.id }

        console.log(data)

        const equipment = await _create(data, _transaction)

        const _equipment = await _findOne(equipment.id)

        await _transaction.commit()

        return res.status(201).json({
            status: 'success',
            message: `La impresora o scanner fue creado correctamente.`,
            info: _equipment
        })
    } catch (error) {
        await _transaction.rollback()

        const errorMessage = error.message;

        if (errorMessage.includes('_cc)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('La cédula ya ha sido registrada para otro usuario.')
        }

        if (errorMessage.includes('_serial)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('El serial ya ha sido registrado para otra impresora o scanner.')
        }

        return res.status(500).json(errorMessage.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.'));
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

        if (!foundEquipment) {
            return res.status(400).json(`La impresora o scanner no existe.`)
        }

        let data = req.body;

        if (data.license_plate) {
            const findPlate = await _findByPlate(data.license_plate, _transaction)

            if (findPlate) throw Error('La placa de la impresora o scanner ya esta registrada.')
        }

        const { brand } = data;

        if (brand) {
            const newBrand = { name: brand, type: 'printer_scanner' }

            const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

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
            message: 'La impresora o scanner se actualizo correctamente correctamente.',
            info: _equipment
        })
    } catch (error) {
        await _transaction.rollback()

        const errorMessage = error.message;

        if (errorMessage.includes('_cc)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('La cédula ya ha sido registrada para otro usuario.')
        }

        if (errorMessage.includes('_serial)') && errorMessage.includes('ORA-00001')) {
            return res.status(500).json('El serial ya ha sido registrado para otra impresora o scanner.')
        }

        return res.status(500).json(errorMessage.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.'));
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