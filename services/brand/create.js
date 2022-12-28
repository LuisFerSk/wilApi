const db = require('../../models')

async function findOrCreate(nameBrand) {
    const nameBrandUpperCase = nameBrand.toUpperCase()

    return await db.brand.findOrCreate({
        where: { name: nameBrandUpperCase },
        defaults: {
            name: nameBrandUpperCase,
        }
    })
}

module.exports = {
    findOrCreate
}