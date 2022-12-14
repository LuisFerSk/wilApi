const db = require('../../models')

async function create(maintenance) {
    if (!maintenance.date) throw new Error('La fecha del mantenimiento es requerida.')
    if (!maintenance.equipment_id) throw new Error('El id del equipo mantenimiento es requerida.')

    return await db.maintenance.create(maintenance);
}

module.exports = {
    create
}