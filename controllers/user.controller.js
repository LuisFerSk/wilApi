const { createSupport, createAdministrator } = require('../services/users/create')
const { findByUsername, findById } = require('../services/users/find')

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

module.exports = {
    _createSupport,
    _findByUsername,
    _findById,
    _createAdministrator,
}