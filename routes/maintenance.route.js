const express = require('express')
const { _create, _findAll, _destroy, _findOne, _findAllByUser } = require('../controllers/maintenance.controller')
const { verifyUser, decodeToken, verifyAdmin } = require('../middleware/authjwt')
const upload = require('../middleware/storage')

const router = express.Router()

const baseUrl = 'maintenance'

router.post(`/${baseUrl}/create`, verifyUser, upload.single('signature'), async (req, res) => {
    try {
        const file = req.file

        if (!file) {
            return res.status(400).json('Por favor cargue la firma.')
        }

        const decryptedToken = decodeToken(req)

        const data = {
            ...req.body,
            user_id: decryptedToken.info.id,
            signature: `/imgs/${file.filename}`
        }

        const maintenance = await _create(data)

        const _maintenance = await _findOne(maintenance.id)

        return res.status(201).json({
            status: 'success',
            message: `El mantenimiento fue agregado correctamente.`,
            info: _maintenance
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-all`, verifyAdmin, async (req, res) => {
    try {
        const maintenances = await _findAll()

        return res.status(200).json({
            status: 'success',
            message: 'la información de los mantenimientos se consultaron correctamente correctamente.',
            info: maintenances
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-by-user`, verifyUser, async (req, res) => {
    try {
        const decryptedToken = decodeToken(req)

        const maintenances = await _findAllByUser(decryptedToken.info.id)

        return res.status(200).json({
            status: 'success',
            message: 'la información de los mantenimientos se consultaron correctamente correctamente.',
            info: maintenances
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
            message: 'El mantenimiento se elimino correctamente correctamente.',
            result
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;