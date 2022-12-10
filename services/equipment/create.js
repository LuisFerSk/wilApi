const db = require('../../models')

async function create(equipment) {
    if (!equipment.type_equipment) throw new Error('Falta el tipo de equipo.')
    if (!equipment.brand) throw new Error('Falta la marca del equipo.')
    if (!equipment.model) throw new Error('Falta el modelo del equipo.')
    if (!equipment.serial) throw new Error('Falta el serial del equipo.')
    if (!equipment.monitor_serial) throw new Error('Falta el serial del monitor.')
    if (!equipment.license_plate) throw new Error('Falta la placa del equipo.')
    if (!equipment.area) throw new Error('Falta el area en donde esta ubicado el equipo.')
    if (!equipment.flat) throw new Error('Falta el piso en donde esta ubicado el equipo.')

    return await db.equipment.create(equipment);
}

module.exports = {
    create
}