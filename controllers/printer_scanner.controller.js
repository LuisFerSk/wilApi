const { create } = require('../services/printer_scanner/create')
const { findAll, findOne } = require('../services/printer_scanner/find')
const { update } = require('../services/printer_scanner/update')

function _create(printer_scanner, transaction = undefined) {
    return create(printer_scanner, transaction)
}

function _findAll() {
    return findAll()
}

function _update(printer_scanner) {
    return update(printer_scanner)
}


function _findOne(id) {
    return findOne(id)
}

module.exports = {
    _create,
    _findAll,
    _update,
    _findOne,
}