const db = require('../../models')

async function destroy(id, transaction = undefined) {
    return await db.equipment_user.destroy({
        where: {
            id
        },
        transaction
    });
}

module.exports = {
    destroy
}