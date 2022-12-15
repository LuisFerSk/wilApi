const db = require('../../models')

async function findAll() {
    return await db.maintenance.findAll()
}

module.exports = {
    findAll
}