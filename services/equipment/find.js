const db = require('../../models')

function findAll() {
    return db.equipment.findAll({
        include: [db.brand]
    })
}

function findOne(id) {
    if (!id) throw new Error('Falta el id del equipo.')

    return db.equipment.findOne({
        where: {
            id,
            // deleted_at: null
        },
        include: [db.brand]
    })
}

function findByPlate(plate, transaction = undefined) {
    if (!plate) throw new Error('Falta la placa del equipo.')

    return db.equipment.findOne({
        where: {
            license_plate: plate,
            // deleted_at: null
        },
        include: [db.brand],
        transaction
    })
}

module.exports = {
    findAll,
    findOne,
    findByPlate,
}