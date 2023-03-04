const { create } = require('../services/equipment/create')
const { findAll, findOne } = require('../services/equipment/find')
const { update } = require('../services/equipment/update')

function _findAll() {
    return findAll()
}

function _create(equipment, transaction = undefined) {
    return create(equipment, transaction)
}

function _update(equipment, transaction = undefined) {
    return update(equipment, transaction)
}

function _findOne(id, transaction = undefined) {
    return findOne(id, transaction)
}

module.exports = {
    _create,
    _findAll,
    _update,
    _findOne,
}