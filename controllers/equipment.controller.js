const { create } = require('../services/equipment/create')
const { destroy } = require('../services/equipment/destroy')
const { findAll, findOne, findByPlate } = require('../services/equipment/find')
const { update } = require('../services/equipment/update')

function _create(equipment, transaction = undefined) {
    return create(equipment, transaction)
}

function _findAll() {
    return findAll()
}

function _update(equipment) {
    return update(equipment)
}

function _destroy(id, transaction = undefined) {
    return destroy(id, transaction)
}

function _findOne(id, transaction = undefined) {
    return findOne(id, transaction)
}

function _findByPlate(plate, transaction = undefined) {
    return findByPlate(plate, transaction)
}

module.exports = {
    _create,
    _findAll,
    _update,
    _destroy,
    _findOne,
    _findByPlate,
}