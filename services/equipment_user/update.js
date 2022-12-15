const db = require('../../models')

async function update(equipment_user) {
    const { id, ...restEquipment_user } = equipment_user
    return await db.equipment_user.update(restEquipment_user, {
        where: {
            id,
            deleted_at: null
        }
    });
}

module.exports = {
    update
}