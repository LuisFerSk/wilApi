const db = require('../../models')

async function create(printer_scanner, transaction = undefined) {
    if (!printer_scanner.type) throw new Error('Falta el tipo de equipo.')
    if (!printer_scanner.campus) throw new Error('Falta la sede donde esta ubicado el equipo.')
    if (!printer_scanner.brandId) throw new Error('Falta la marca del equipo.')
    if (!printer_scanner.model) throw new Error('Falta el modelo del equipo.')
    if (!printer_scanner.serial) throw new Error('Falta el serial del equipo.')
    if (!printer_scanner.area) throw new Error('Falta el area en donde esta ubicado el equipo.')
    if (!printer_scanner.state) throw new Error('Falta el estado de la impresora o equipo.')
    if (!printer_scanner.acquiredBy) throw new Error('Falta el método de adquisición es rentada o no.')
    if (!printer_scanner.dateOfPurchaseOrRental) throw new Error('Falta la fecha de compra o renta.')

    try {
        const result = await db.printer_scanner.create(printer_scanner, { transaction })

        return result;
    } catch (error) {
        const tableName = 'printer_scanner'

        const errorMessage = error.message;

        if (errorMessage.includes(`${tableName}s_serial_unique`)) throw new Error('El serial ya ha sido registrado para otra impresora o scanner.')
        if (errorMessage.includes(`${tableName}s_licensePlate_unique`)) throw new Error('La placa ya ha sido registrada para otra impresora o scanner.')

        throw new Error(errorMessage.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.'))
    }
}

module.exports = {
    create
}