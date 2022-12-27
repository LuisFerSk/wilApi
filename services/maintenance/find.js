const db = require('../../models')

async function findAll() {
    return await db.maintenance.findAll({
        include: [db.equipment_user, db.equipment, db.user]
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

async function findOne(id) {
    return await db.maintenance.findOne({
        include: [db.equipment_user, db.equipment],
        where: {
            id
        }
    })
}

module.exports = {
    findAll,
    findAllByUser,
    findOne,
}