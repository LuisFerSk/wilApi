const { create } = require('../services/equipment/create')
const { destroy } = require('../services/equipment/destroy')
const { findAll } = require('../services/equipment/find')
const { update } = require('../services/equipment/update')

async function _create(equipment) {
    return await create(equipment)
}

async function _findAll() {
    return await findAll()
}

async function _update(equipment) {
    return await update(equipment)
}

async function _destroy(equipment) {
    return await destroy(equipment)
}

module.exports = {
    _create,
    _findAll,
    _update,
    _destroy,
}