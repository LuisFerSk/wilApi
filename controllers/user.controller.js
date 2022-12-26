const { createSupport, createAdministrator, initAdministrator } = require('../services/user/create')
const { findByUsername, findById } = require('../services/user/find')

async function _createSupport(user) {
    return await createSupport(user)
}

async function _createAdministrator(user) {
    return await createAdministrator(user)
}

async function _findByUsername(username) {
    return await findByUsername(username)
}

async function _findById(id) {
    return await findById(id)
}

async function _initAdministrator() {
    return await initAdministrator()
}

module.exports = {
    _createSupport,
    _findByUsername,
    _findById,
    _createAdministrator,
    _initAdministrator,
}