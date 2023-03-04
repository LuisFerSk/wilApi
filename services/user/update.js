const db = require('../../models')
const bcrypt = require('bcrypt')

function updatePassword(user) {
    const { id, password } = user;

    if (!id) throw new Error('Falta el id del usuario.')
    if (!password) throw new Error('Falta la nueva contraseña.')

    const newUser = { password: bcrypt.hashSync(password, 10) }

    return db.user.update(newUser, {
        where: {
            id,
        }
    });
}

module.exports = {
    updatePassword
}