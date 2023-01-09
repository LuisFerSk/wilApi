const db = require('../../models')

async function updatePassword(user) {
    const { id, password } = user;

    if (!id) throw new Error('Falta el id del usuario.')
    if (!password) throw new Error('Falta la nueva contraseña.')

    const newUser = { password }

    return await db.user.update(newUser, {
        where: {
            id,
            deleted_at: null
        }
    });
}

module.exports = {
    updatePassword
}