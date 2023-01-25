const db = require('../../models')

async function update(printer_scanner) {
    const { id, ...restPrinter_scanner } = printer_scanner;

    if (!id) throw new Error('Falta el id de la impresora o scanner.')

    return await db.printer_scanner.update(restPrinter_scanner, {
        where: {
            id,
            deleted_at: null
        }
    });
}

module.exports = {
    update
}