const { create } = require('../services/maintenance/create')
const { destroy } = require('../services/maintenance/destroy')
const { findAll } = require('../services/maintenance/find')

async function _create(maintenance) {
    return await create(maintenance)
}

async function _findAll() {
    return await findAll()
}

async function _destroy(id) {
    return await destroy(id)
}

module.exports = {
    _create,
    _findAll,
    _destroy,
}