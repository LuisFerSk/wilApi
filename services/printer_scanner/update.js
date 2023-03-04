const db = require('../../models')

async function update(printer_scanner) {
    const { id, ...restPrinter_scanner } = printer_scanner;

    if (!id) throw new Error('Falta el id de la impresora o scanner.')

    try {
        const result = await db.printer_scanner.update(restPrinter_scanner, {
            where: {
                id,
            }
        })

        return result;
    } catch (error) {
        const errorMessage = error.message;

        if (errorMessage.includes(`${baseUrl}s_serial_unique`)) throw new Error('El serial ya ha sido registrado para otra impresora o scanner.')
        if (errorMessage.includes(`${baseUrl}s_licensePlate_unique`)) throw new Error('La placa ya ha sido registrada para otra impresora o scanner.')

        throw new Error(errorMessage.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.'))
    }
}

module.exports = {
    update
}