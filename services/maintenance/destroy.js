const db = require('../../models')

async function destroy(id) {
    return await db.maintenance.destroy({
        where: {
            id
        },
    });
}

async function destroyWhere(where, transaction = undefined) {
    return await db.maintenance.destroy({
        where,
        transaction
    })
}

module.exports = {
    destroy,
    destroyWhere
}