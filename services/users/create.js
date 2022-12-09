const db = require('../../models')
const bcrypt = require('bcrypt');

async function create(user) {
    if (!user.username) throw new Error('Falta el nombre de usuario.')
    if (!user.password) throw new Error('Falta la contraseña.')

    return await db.user.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    });
}

module.exports = {
    create
}