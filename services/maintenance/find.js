const db = require('../../models')

function formatDateApi(date, daysSetting = 0) {
    const dateFormat = new Date(date)

    dateFormat.setDate(dateFormat.getDate() + daysSetting)
    dateFormat.setHours(0, 0, 0, 0)

    return dateFormat.toLocaleDateString()
}

const includeFindOne = [
    db.equipment_user,
    db.user,
    {
        model: db.equipment,
        include: [db.brand]
    }
]

async function findAll() {
    return await db.maintenance.findAll({
        include: includeFindOne
    });
}

async function findAllByUser(id) {
    return await db.maintenance.findAll({
        include: includeFindOne,
        where: {
            user_id: id
        }
    });
}

async function findOne(id) {
    return await db.maintenance.findOne({
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

function getFindMadePerDayBetween() {
    const today = new Date()

    return [formatDateApi(today, -31), formatDateApi(today)]
}

async function findMadePerDay() {
    return await db.maintenance.findAll({
        ...findMadePerDayProps,
        where: {
            date: {
                $between: getFindMadePerDayBetween()
            }
        },
    })
}

async function findMadePerDayByUser(id) {
    return await db.maintenance.findAll({
        ...findMadePerDayProps,
        where: {
            user_id: id,
            date: {
                $between: getFindMadePerDayBetween()
            }
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