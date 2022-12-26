const db = require('../../models')

async function findByUsername(username) {
    if (!username) throw new Error('Falta el nombre de usuario.')

    return await db.user.findOne({
        where: {
            username
        }
    })
}

async function findById(id) {
    if (!id) throw new Error('Falta el id del usuario.')

    return await db.user.findOne({
        where: {
            id
        }
    })
}

module.exports = {
    findByUsername,
    findById
}