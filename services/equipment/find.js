const db = require('../../models')

function findAll() {
    return db.equipment.findAll({
        include: db.brand
    })
}

function findOne(id, transaction = undefined) {
    if (!id) throw new Error('Falta el id del equipo.')

    return db.equipment.findOne({
        where: {
            id,
        },
        include: db.brand,
        transaction
    })
}

module.exports = {
    findAll,
    findOne,
}