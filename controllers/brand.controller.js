const { findOrCreate } = require('../services/brand/create')
const { findAllByEquipment, findAllByPrinterScanner } = require('../services/brand/find')

function _findOrCreate(brand, transaction = undefined) {
    return findOrCreate(brand, transaction)
}

function _findAllByEquipment() {
    return findAllByEquipment()
}

function _findAllByPrinterScanner() {
    return findAllByPrinterScanner()
}


module.exports = {
    _findOrCreate,
    _findAllByEquipment,
    _findAllByPrinterScanner,
}