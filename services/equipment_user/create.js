const db = require('../../models')

async function create(equipment_user) {
    if (!equipment_user.name) throw Error('Falta el nombre de usuario.')
    if (!equipment_user.cc) throw Error('Falta la cédula del usuario.')

    return await db.equipment_user.create(equipment_user)
}

module.exports = {
    create
}