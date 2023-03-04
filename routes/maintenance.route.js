const express = require('express')
const { _create, _findAll, _findOne, _findAllByUser, _findMadePerDayByUser, _findOneByUser, _findMadePerDay } = require('../controllers/maintenance.controller')
const { verifyUser, decodeToken, verifyAdmin } = require('../middleware/authjwt')
const upload = require('../middleware/storage')
const { ROLE_ADMINISTRATOR, ROLE_SUPPORT } = require('../config')

const router = express.Router()

const baseUrl = 'maintenance'

router.post(`/${baseUrl}/create`, verifyUser, upload.single('signature'), async (req, res) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json('Por favor cargue la firma.')
        }

        const decryptedToken = decodeToken(req)

        const data = {
            ...req.body,
            userId: decryptedToken.id,
            signature: `/imgs/${file.filename}`
        }

        const maintenance = await _create(data)

        const _maintenance = await _findOne(maintenance.id)

        return res.status(201).json(_maintenance)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find/:id`, verifyUser, async (req, res) => {
    try {
        const decryptedToken = decodeToken(req)

        let maintenances;

        const { role } = decryptedToken;

        const { id } = req.params;

        if (role === ROLE_ADMINISTRATOR) {
            maintenances = await _findOne(id)
        }

        if (role === ROLE_SUPPORT) {
            maintenances = await _findOneByUser(decryptedToken.id, id)
        }

        if (!maintenances) return res.status(404).json('No se encontró el mantenimiento')

        return res.status(200).json(maintenances)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get(`/${baseUrl}/find-all`, verifyUser, async (req, res) => {
    try {
        const decryptedToken = decodeToken(req)

        let maintenances;

        const { role, id } = decryptedToken;

        if (role === ROLE_ADMINISTRATOR) {
            maintenances = await _findAll()
        }

        if (role === ROLE_SUPPORT) {
            maintenances = await _findAllByUser(id)
        }

        return res.status(200).json(maintenances)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.get(`/${baseUrl}/find-made-per-day`, verifyUser, async (req, res) => {
    try {
        const decryptedToken = decodeToken(req)

        const { role } = decryptedToken;

        let query;

        if (role === ROLE_ADMINISTRATOR) {
            query = await _findMadePerDay()
        }

        if (role === ROLE_SUPPORT) {
            query = await _findMadePerDayByUser(decryptedToken.id)
        }

        return res.status(200).json(query)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

router.delete(`/${baseUrl}/destroy`, verifyAdmin, async (req, res) => {
    try {
        const row = await _findOne(req.body.id)

        if (!row) return res.status(404).json('El mantenimiento no fue encontrado.')

        await row.destroy()

        return res.status(200).json('El mantenimiento se elimino correctamente correctamente.')
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

module.exports = router;