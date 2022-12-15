const db = require('../../models')

async function findAll() {
    return await db.equipment_user.findAll()
}

async function findOne(id) {
    if (!id) throw new Error('Falta el id del usuario.')

    return await db.equipment_user.findOne({
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