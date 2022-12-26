const db = require('../../models')

async function findAll() {
    return await db.equipment.findAll()
}

module.exports = {
    findAll,
}