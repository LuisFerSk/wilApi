const db = require('../../models')
const uuid = require('uuid')

async function create(maintenance, transaction = undefined) {
    if (!maintenance.date) throw new Error('La fecha del mantenimiento es requerida.')
    if (!maintenance.equipment_id) throw new Error('El id del equipo al que se le realizo mantenimiento es requerida.')
    if (!maintenance.equipment_user_id) throw new Error('El id del usuario del equipo es requerida.')
    if (!maintenance.user_id) throw new Error('El id del soporte es requerida.')
    if (!maintenance.city) throw new Error('la ciudad es requerida.')
    if (!maintenance.campus) throw new Error('La sede es requerida.')

    maintenance.id = uuid.v4().slice(0, 6)

    return await db.maintenance.create(maintenance, { transaction });
}

module.exports = {
    create
}