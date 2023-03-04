const db = require('../../models')

const includeFindOne = [
    db.user,
    {
        model: db.equipment,
        include: [db.brand]
    }
]

function findAll() {
    return db.maintenance.findAll({
        include: includeFindOne
    });
}

function findAllByUser(id) {
    return db.maintenance.findAll({
        include: includeFindOne,
        where: {
            userId: id
        }
    });
}

function findOne(id) {
    return db.maintenance.findOne({
        include: includeFindOne,
        where: {
            id
        }
    })
}

function findOneByUser(userId, id) {
    return db.maintenance.findOne({
        include: includeFindOne,
        where: {
            id,
            userId
        }
    })
}

const findMadePerDayProps = {
    attributes: [
        "date",
        [db.sequelize.fn("COUNT", db.sequelize.col("*")), "count"]
    ],
    group: ["date"],
    order: ["date"],
}

function findMadePerDay() {
    return db.maintenance.findAll({
        ...findMadePerDayProps,
    })
}

function findMadePerDayByUser(id) {
    return db.maintenance.findAll({
        ...findMadePerDayProps,
        where: {
            user_id: id,
        },
    })
}



module.exports = {
    findAll,
    findAllByUser,
    findOne,
    findMadePerDay,
    findMadePerDayByUser,
    findOneByUser,
}