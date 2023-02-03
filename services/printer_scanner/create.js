const db = require('../../models')

function create(printer_scanner, transaction = undefined) {
    if (!printer_scanner.type) throw new Error('Falta el tipo de equipo.')
    if (!printer_scanner.campus) throw new Error('Falta la sede donde esta ubicado el equipo.')
    if (!printer_scanner.brand) throw new Error('Falta la marca del equipo.')
    if (!printer_scanner.model) throw new Error('Falta el modelo del equipo.')
    if (!printer_scanner.serial) throw new Error('Falta el serial del equipo.')
    if (!printer_scanner.area) throw new Error('Falta el area en donde esta ubicado el equipo.')
    if (!printer_scanner.flat) throw new Error('Falta el piso en donde esta ubicado el equipo.')
    if (!printer_scanner.user) throw new Error('Falta el nombre de usuario del equipo.')
    if (!printer_scanner.cc) throw new Error('Falta la cédula de usuario del equipo.')

    return db.printer_scanner.create(printer_scanner, { transaction });
}

module.exports = {
    create
}