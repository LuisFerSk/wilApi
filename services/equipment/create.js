const db = require('../../models')

function create(equipment, transaction = undefined) {
    if (!equipment.type) throw new Error('Falta el tipo de equipo.')
    if (!equipment.campus) throw new Error('Falta la sede donde esta ubicado el equipo.')
    if (!equipment.brand) throw new Error('Falta la marca del equipo.')
    if (!equipment.model) throw new Error('Falta el modelo del equipo.')
    if (!equipment.serial) throw new Error('Falta el serial del equipo.')
    if (!equipment.area) throw new Error('Falta el area en donde esta ubicado el equipo.')
    if (!equipment.user) throw new Error('Falta el nombre de usuario del equipo.')
    if (!equipment.cc) throw new Error('Falta la cédula de usuario del equipo.')

    return db.equipment.create(equipment, { transaction, validator: true });
}

module.exports = {
    create
}