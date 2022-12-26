const { create } = require('../services/equipment/create')
const { destroy } = require('../services/equipment/destroy')
const { findAll, findOne } = require('../services/equipment/find')
const { update } = require('../services/equipment/update')

async function _create(equipment, transaction = undefined) {
    return await create(equipment, transaction)
}

async function _findAll() {
    return await findAll()
}

async function _update(equipment) {
    return await update(equipment)
}

async function _destroy(id) {
    return await destroy(id)
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