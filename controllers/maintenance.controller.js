const { create } = require('../services/maintenance/create')
const { destroy, destroyWhere } = require('../services/maintenance/destroy')
const { findAll, findOne, findAllByUser, findMadePerDay, findMadePerDayByUser, findOneByUser } = require('../services/maintenance/find')

function _create(maintenance, transaction = undefined) {
    return create(maintenance, transaction)
}

function _findAll() {
    return findAll()
}

function _destroy(id, transaction = undefined) {
    return destroy(id, transaction)
}

function _findOne(id) {
    return findOne(id)
}

function _findOneByUser(userId, maintenanceId) {
    return findOneByUser(userId, maintenanceId)
}

function _findAllByUser(id) {
    return findAllByUser(id)
}

function _destroyWhere(where, transaction = undefined) {
    return destroyWhere(where, transaction)
}

function _findMadePerDay() {
    return findMadePerDay()
}

function _findMadePerDayByUser(id) {
    return findMadePerDayByUser(id)
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
    _findOneByUser,
}