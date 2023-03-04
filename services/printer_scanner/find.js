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
        },
        include: [db.brand]
    })
}

module.exports = {
    findAll,
    findOne,
}