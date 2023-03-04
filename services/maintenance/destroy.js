const db = require('../../models')

function destroyWhere(where, transaction = undefined) {
    return db.maintenance.destroy({
        where,
        transaction
    })
}

module.exports = {
    destroyWhere
}