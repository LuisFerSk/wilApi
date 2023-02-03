const db = require('../../models')

function findOrCreate(brand) {

    const { name, type } = brand;

    if (typeof name !== 'string') throw new Error('El nombre de la marca debe ser una cadena de texto.')
    if (typeof type !== 'string') throw new Error('El nombre de la marca debe ser una cadena de texto.')

    const newBrand = {
        name: name.toUpperCase(),
        type
    }

    return db.brand.findOrCreate({
        where: newBrand,
        defaults: newBrand
    })
}

module.exports = {
    findOrCreate
}