const { findOrCreate } = require('../services/brand/create')
const { findAll } = require('../services/brand/find')

async function _findOrCreate(brand, transaction = undefined) {
    return await findOrCreate(brand, transaction)
}

async function _findAll() {
    return await findAll()
}


module.exports = {
    _findOrCreate,
    _findAll,
}