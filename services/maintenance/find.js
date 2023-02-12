const db = require('../../models')

function formatDateApi(date, daysSetting = 0) {
    const dateFormat = new Date(date)

    dateFormat.setDate(dateFormat.getDate() + daysSetting)
    dateFormat.setHours(0, 0, 0, 0)

    return dateFormat.toLocaleDateString()
}

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
            user_id: id
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
}