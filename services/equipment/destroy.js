const db = require('../../models')

async function destroy(id) {
    return await db.equipment.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    destroy
}