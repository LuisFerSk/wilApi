const db = require('../../models')

async function findAll() {
    return await db.brand.findAll()
}

module.exports = {
    findAll,
}