const db = require('../../models')

function destroy(id, transaction = undefined) {
    return db.equipment.destroy({
        where: {
            id
        },
        transaction
    });
}

module.exports = {
    destroy
}