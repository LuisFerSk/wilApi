const db = require('../../models')

async function findAll() {
    return await db.equipment.findAll()
}

async function findOne(id) {
    if (!id) throw new Error('Falta el id del equipo.')

    return await db.equipment.findOne({
        where: {
            id,
            deleted_at: null
        }
    })
}

module.exports = {
    findAll,
    findOne
}