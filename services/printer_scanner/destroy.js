const db = require('../../models')

function destroy(id, transaction = undefined) {
    return db.printer_scanner.destroy({
        where: {
            id
        },
        transaction
    });
}

module.exports = {
    destroy
}