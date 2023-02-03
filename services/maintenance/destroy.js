const db = require('../../models')

function destroy(id) {
    return db.maintenance.destroy({
        where: {
            id
        },
    });
}

function destroyWhere(where, transaction = undefined) {
    return db.maintenance.destroy({
        where,
        transaction
    })
}

module.exports = {
    destroy,
    destroyWhere
}