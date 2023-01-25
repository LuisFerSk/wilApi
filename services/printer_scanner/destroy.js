const db = require('../../models')

async function destroy(id, transaction = undefined) {
    return await db.printer_scanner.destroy({
        where: {
            id
        },
        transaction
    });
}

module.exports = {
    destroy
}