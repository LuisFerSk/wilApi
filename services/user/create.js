const db = require('../../models')
const bcrypt = require('bcrypt');
const { ROLE_ADMINISTRATOR, ROLE_SUPPORT } = require('../../config');

function createSupport(user) {
    if (!user.username) throw new Error('Falta el nombre de usuario.')
    if (!user.password) throw new Error('Falta la contraseña.')

    return db.user.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
        role: ROLE_SUPPORT
    });
}

function createAdministrator(user) {
    if (!user.username) throw new Error('Falta el nombre de usuario.')
    if (!user.password) throw new Error('Falta la contraseña.')

    return db.user.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
        role: ROLE_ADMINISTRATOR
    });
}

function initAdministrator() {
    return db.user.findOrCreate({
        where: { username: 'admin' },
        defaults: {
            username: 'admin',
            password: bcrypt.hashSync('12345678', 10),
            role: ROLE_ADMINISTRATOR
        }
    })
}

module.exports = {
    createSupport,
    createAdministrator,
    initAdministrator
}