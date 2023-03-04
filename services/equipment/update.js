const db = require('../../models')

async function update(equipment, transaction = undefined) {
    const { id, ...restEquipment } = equipment;

    if (!id) throw new Error('Falta el id del equipo.')

    try {
        const result = await db.equipment.update(restEquipment, {
            where: {
                id,
            },
            transaction
        })

        return result;
    }
    catch (error) {
        const tableName = 'equipment'

        const errorMessage = error.message.replaceAll('Validation error: ', '').replaceAll('.', '').concat('.');

        if (errorMessage.includes(`${tableName}_licensePlate_unique`)) throw new Error('La placa ya ha sido registrada para otro equipo.')
        if (errorMessage.includes(`${tableName}_cc_unique`)) throw new Error('La cédula ya ha sido registrada para otro usuario.')
        if (errorMessage.includes(`${tableName}_serial_unique`)) throw new Error('El serial ya ha sido registrado para otro equipo.')
        if (errorMessage.includes(`${tableName}_monitorLicensePlate_unique`)) throw new Error('La placa del monitor ya ha sido registrada para otro equipo.')
        if (errorMessage.includes(`${tableName}_monitorSerial_unique`)) throw new Error('El serial del monitor ya ha sido registrada para otro equipo.')

        throw new Error(errorMessage)
    }
}

module.exports = {
    update
}