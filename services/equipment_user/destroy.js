const db = require('../../models')

async function destroy(id) {
    return await db.equipment_user.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    destroy
}