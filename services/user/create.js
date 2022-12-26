const db = require('../../models')
const bcrypt = require('bcrypt');

async function createSupport(user) {
    if (!user.username) throw new Error('Falta el nombre de usuario.')
    if (!user.password) throw new Error('Falta la contraseña.')

    return await db.user.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
        role: 'support'
    });
}

async function createAdministrator(user) {
    if (!user.username) throw new Error('Falta el nombre de usuario.')
    if (!user.password) throw new Error('Falta la contraseña.')

    return await db.user.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
        role: 'administrator'
    });
}

async function initAdministrator() {
    return await db.user.findOrCreate({
        where: { username: 'admin' },
        defaults: {
            username: 'admin',
            password: bcrypt.hashSync('12345678', 10),
            role: 'administrator'
        }
    })
}

module.exports = {
    createSupport,
    createAdministrator,
    initAdministrator
}