const { ROLE_SUPPORT } = require('../../config')
const db = require('../../models')

function findByUsername(username) {
    if (!username) throw new Error('Falta el nombre de usuario.')

    return db.user.findOne({
        where: {
            username
        }
    })
}

function findById(id) {
    if (!id) throw new Error('Falta el id del usuario.')

    return db.user.findOne({
        where: {
            id
        }
    })
}

function findAllSupport() {
    return db.user.findAll({
        where: {
            role: ROLE_SUPPORT
        }
    })
}

module.exports = {
    findByUsername,
    findById,
    findAllSupport,
}