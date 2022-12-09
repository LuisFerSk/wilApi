const { create } = require('../services/users/create')
const { findByUsername, findById } = require('../services/users/find')

async function _create(user) {
    return await create(user)
}

async function _findByUsername(username) {
    return await findByUsername(username)
}

async function _findById(id) {
    return await findById(id)
}

module.exports = {
    _create,
    _findByUsername,
    _findById,
}