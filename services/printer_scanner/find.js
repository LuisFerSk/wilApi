const db = require('../../models')

async function findAll() {
    return await db.printer_scanner.findAll({
        include: [db.brand]
    })
}

async function findOne(id) {
    if (!id) throw new Error('Falta el id de la impresora o scanner.')

    return await db.printer_scanner.findOne({
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