const db = require('../../models')

async function update(equipment) {
    const { id, ...restEquipment } = equipment
    return await db.equipment.update(restEquipment, {
        where: {
            id,
            deleted_at: null
        }
    });
}

module.exports = {
    update
}