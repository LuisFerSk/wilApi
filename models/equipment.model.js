const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type_equipment: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
        },
        brand: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [2, 25]
        },
        model: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [2, 25]
        },
        serial: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
        },
        monitor_serial: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
        },
        license_plate: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
        },
        area: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
        },
        flat: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
        }
    }, {
        underscored: true,
        paranoid: true
    })
}