const express = require('express')
const { _findAll } = require('../controllers/brand.controller')
const { verifyUser } = require('../middleware/authjwt')

const router = express.Router()

const baseUrl = 'brand'

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const brands = await _findAll()

        return res.status(200).json({
            status: 'success',
            message: 'Las marcas se consultaron correctamente correctamente.',
            info: brands
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;