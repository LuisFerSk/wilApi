const db = require('../../models')

async function destroy(id) {
    return await db.maintenance.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    destroy
}