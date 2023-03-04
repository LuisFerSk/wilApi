const db = require('../../models')

async function create(equipment, transaction = undefined) {
    if (!equipment.type) throw new Error('Falta el tipo de equipo.')
    if (!equipment.campus) throw new Error('Falta la sede donde esta ubicado el equipo.')
    if (!equipment.brandId) throw new Error('Falta la marca del equipo.')
    if (!equipment.model) throw new Error('Falta el modelo del equipo.')
    if (!equipment.serial) throw new Error('Falta el serial del equipo.')
    if (!equipment.area) throw new Error('Falta el area en donde esta ubicado el equipo.')
    if (!equipment.user) throw new Error('Falta el nombre de usuario del equipo.')
    if (!equipment.cc) throw new Error('Falta la cédula de usuario del equipo.')
    if (!equipment.dateOfPurchase) throw new Error('Falta la fecha de compra del equipo.')
    if (!equipment.warrantyEndDate) throw new Error('Falta la fecha de finalización de la garantía.')
    if (!equipment.state) throw new Error('Falta el estado del equipo.')
    if (!equipment.hardDriveCapacity_1) throw new Error('Falta la capacidad del disco duro 1.')
    if (!equipment.hardDriveType_1) throw new Error('Falta el tipo del disco duro 1.')
    if (!equipment.ramMemoryCapacity) throw new Error('Falta la cantidad de memoria RAM.')
    if (!equipment.ramMemoryType) throw new Error('Falta el tipo de memoria RAM.')

    try {
        const result = await db.equipment.create(equipment, { transaction, validator: true });

        return result;
    }
    catch (error) {
        const tableName = 'equipment'

        const errorMessage = error.message;

        if (errorMessage.includes(`${tableName}_licensePlate_unique`)) throw new Error('La placa ya ha sido registrada para otro equipo.')
        if (errorMessage.includes(`${tableName}_cc_unique`)) throw new Error('La cédula ya ha sido registrada para otro usuario.')
        if (errorMessage.includes(`${tableName}_serial_unique`)) throw new Error('El serial ya ha sido registrado para otro equipo.')
        if (errorMessage.includes(`${tableName}_monitorLicensePlate_unique`)) throw new Error('La placa del monitor ya ha sido registrada para otro equipo.')
        if (errorMessage.includes(`${tableName}_monitorSerial_unique`)) throw new Error('El serial del monitor ya ha sido registrada para otro equipo.')

        throw new Error(errorMessage.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.'))
    }
}

module.exports = {
    create
}