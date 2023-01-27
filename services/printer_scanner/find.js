const db = require('../../models')

function findAll() {
    return db.printer_scanner.findAll({
        include: [db.brand]
    })
}

function findOne(id) {
    if (!id) throw new Error('Falta el id de la impresora o scanner.')

    return db.printer_scanner.findOne({
        where: {
            id,
            deleted_at: null
        },
        include: [db.brand]
    })
}

function findByPlate(plate, transaction = undefined) {
    if (!plate) throw new Error('Falta la placa de la impresora o scanner.')

    return db.printer_scanner.findOne({
        where: {
            license_plate: plate,
            deleted_at: null
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