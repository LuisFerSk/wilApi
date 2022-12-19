const db = require('../../models')
const uuid = require('uuid')

async function create(maintenance) {
    if (!maintenance.date) throw new Error('La fecha del mantenimiento es requerida.')
    if (!maintenance.equipment_id) throw new Error('El id del equipo al que se le realizo mantenimiento es requerida.')
    if (!maintenance.equipment_user_id) throw new Error('El id del usuario del equipo es requerida.')
    if (!maintenance.user_id) throw new Error('El id del soporte es requerida.')

    maintenance.id = uuid.v4().slice(0, 6)

    return await db.maintenance.create(maintenance);
}

module.exports = {
    create
}