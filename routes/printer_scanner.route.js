const express = require('express')
const { _findOrCreate } = require('../controllers/brand.controller')
const { transaction } = require('../controllers/db.controller')
const { _create, _findAll, _update, _findOne } = require('../controllers/printer_scanner.controller')
const { verifyUser, verifyAdmin } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'printer_scanner'

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

        return res.status(201).json('Se ha creado correctamente la impresora o scanner.')
    } catch (error) {
        _transaction.rollback()

        return res.status(500).json(error.message)
    }
})

router.get(`/${baseUrl}/find/:id`, verifyUser, async (req, res) => {
    try {
        const printerScanner = await _findOne(req.params.id)

        if (!printerScanner) return res.status(404).json('No se encontró la impresora o scanner.')

        return res.status(200).json(printerScanner)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const printerScanner = await _findAll()

        return res.status(200).json(printerScanner)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.put(`/${baseUrl}/update`, verifyAdmin, async (req, res) => {
    const _transaction = await transaction();

    try {
        const foundPrinterScanner = await _findOne(req.body.id)

        if (!foundPrinterScanner) return res.status(400).json(`La impresora o scanner no existe.`)

        let data = req.body;

        const { brand } = data;

        delete data.brand;

        if (brand) {
            const newBrand = createDataBrand(req.body.brand)

            const [findBrand, createBrand] = await _findOrCreate(newBrand, _transaction)

            const _brand = findBrand || createBrand;

            data = { ...req.body, brandId: _brand.id }
        }

        await _update(data)

        _transaction.commit()

        return res.status(200).json('La impresora o scanner se actualizo correctamente correctamente.')
    } catch (error) {
        _transaction.rollback()

        return res.status(500).json(error.message)
    }
})

router.delete(`/${baseUrl}/destroy`, verifyAdmin, async (req, res) => {
    try {
        const row = await _findOne(req.body.id)

        if (!row) return res.status(404).json('La impresora o scanner no fue encontrado.')

        await row.destroy()

        return res.status(200).json('La impresora o scanner se elimino correctamente correctamente.')
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;