const db = require('../../models')

async function findAll() {
    return await db.maintenance.findAll({
        include: [db.equipment_user, db.equipment]
    });
}

async function findAllByUser(id) {
    return await db.maintenance.findAll({
        include: [db.equipment_user, db.equipment],
        where: {
            user_id: id
        }
    });
}

module.exports = {
    findAll
}