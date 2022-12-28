const { create } = require('../services/equipment_user/create')
const { findAll, findOne } = require('../services/equipment_user/find')
const { update } = require('../services/equipment_user/update')
const { destroy } = require('../services/equipment_user/destroy')

async function _create(equipment_user) {
    return await create(equipment_user)
}

async function _findAll() {
    return await findAll()
}

async function _update(equipment_user) {
    return await update(equipment_user)
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
    _findOne,
}