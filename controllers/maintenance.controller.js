const { create } = require('../services/maintenance/create')
const { destroy, destroyWhere } = require('../services/maintenance/destroy')
const { findAll, findOne, findAllByUser, findMadePerDay, findMadePerDayByUser } = require('../services/maintenance/find')

async function _create(maintenance) {
    return await create(maintenance)
}

async function _findAll() {
    return await findAll()
}

async function _destroy(id) {
    return await destroy(id)
}

async function _findOne(id) {
    return await findOne(id)
}

async function _findAllByUser(id) {
    return await findAllByUser(id)
}

async function _destroyWhere(where, transaction = undefined) {
    return await destroyWhere(where, transaction)
}

async function _findMadePerDay() {
    return await findMadePerDay()
}

async function _findMadePerDayByUser(id) {
    return await findMadePerDayByUser(id)
}

module.exports = {
    _create,
    _findAll,
    _destroy,
    _findOne,
    _findAllByUser,
    _destroyWhere,
    _findMadePerDay,
    _findMadePerDayByUser,
}