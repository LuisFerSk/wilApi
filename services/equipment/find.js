const db = require('../../models')

async function findAll() {
    return await db.equipment.findAll({
        include: [db.brand]
    })
}

async function findOne(id) {
    if (!id) throw new Error('Falta el id del equipo.')

    return await db.equipment.findOne({
        where: {
            id,
            deleted_at: null
        },
        include: [db.brand]
    })
}

module.exports = {
    findAll,
    findOne,
}