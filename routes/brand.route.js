const express = require('express')
const { _findAllByEquipment, _findAllByPrinterScanner } = require('../controllers/brand.controller')
const { verifyUser } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'brand'

router.get(`/${baseUrl}/find-all-by-equipment`, verifyUser, async (req, res) => {
    try {
        const brands = await _findAllByEquipment()

        return res.status(200).json(brands)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all-by-printer-scanner`, verifyUser, async (req, res) => {
    try {
        const brands = await _findAllByPrinterScanner()

        return res.status(200).json(brands)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;