const db = require('../../models')

async function findOrCreate(nameBrand) {
    if (typeof nameBrand !== 'string') throw new Error('El nombre de la marca debe ser una cadena de texto.')

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