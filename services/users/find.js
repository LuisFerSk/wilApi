const db = require('../../models')

async function findByUsername(username) {
    if (!username) throw new Error('Falta el nombre de usuario.')
    
    return await db.user.findOne({
        where: {
            username
        }
    })
}

module.exports = {
    findByUsername
}