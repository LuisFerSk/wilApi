const db = require('../../models')

function findAllByEquipment() {
    return db.brand.findAll({
        where: {
            type: 'equipment'
        }
    })
}

function findAllByPrinterScanner() {
    return db.brand.findAll({
        where: {
            type: 'printer_scanner'
        }
    })
}

module.exports = {
    findAllByPrinterScanner,
    findAllByEquipment,
}