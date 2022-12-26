const db = require("../models");

async function transaction() {
    return await db.sequelize.transaction()
}

module.exports = {
    transaction
}