const db = require('../../models')
const uuid = require('uuid')

function create(maintenance, transaction = undefined) {
    if (!maintenance.date) throw new Error('La fecha del mantenimiento es requerida.')
    if (!maintenance.equipmentId) throw new Error('El id del equipo al que se le realizo mantenimiento es requerida.')
    if (!maintenance.userId) throw new Error('El id del soporte es requerida.')
    if (!maintenance.city) throw new Error('la ciudad es requerida.')
    if (!maintenance.signature) throw new Error('La firma es requerida.')

    maintenance.id = uuid.v4().slice(0, 6).trim()

    return db.maintenance.create(maintenance, { transaction });
}

module.exports = {
    create
}