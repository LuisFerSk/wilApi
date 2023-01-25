const { create } = require('../services/printer_scanner/create')
const { destroy } = require('../services/printer_scanner/destroy')
const { findAll, findOne } = require('../services/printer_scanner/find')
const { update } = require('../services/printer_scanner/update')

async function _create(printer_scanner, transaction = undefined) {
    return await create(printer_scanner, transaction)
}

async function _findAll() {
    return await findAll()
}

async function _update(printer_scanner) {
        return await update(printer_scanner)
}

async function _destroy(id, transaction = undefined) {
    return await destroy(id, transaction)
}

async function _findOne(id) {
    return await findOne(id)
}

module.exports = {
    _create,
    _findAll,
    _update,
    _destroy,
    _findOne
}