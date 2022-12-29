const db = require('../../models')

async function findAll() {
    return await db.maintenance.findAll({
        include: [
            db.equipment_user,
            db.user,
            {
                model: db.equipment,
                include: [db.brand]
            }
        ]
    });
}

async function findAllByUser(id) {
    return await db.maintenance.findAll({
        include: [
            db.equipment_user,
            {
                model: db.equipment,
                include: [db.brand]
            }
        ],
        where: {
            user_id: id
        }
    });
}

async function findOne(id) {
    return await db.maintenance.findOne({
        include: [
            db.equipment_user,
            {
                model: db.equipment,
                include: [db.brand]
            }
        ],
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