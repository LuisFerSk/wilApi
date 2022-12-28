const db = require('../../models')

async function destroy(id, transaction = undefined) {
    return await db.equipment.destroy({
        where: {
            id
        },
        transaction
    });
}

module.exports = {
    destroy
}