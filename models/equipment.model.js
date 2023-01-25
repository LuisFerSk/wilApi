const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
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
            len: [3, 25]
        },
        license_plate: {
            type: Sequelize.STRING,
            validator: {
                is: /^[0-9]+$/
            },
            len: [4, 5]
        },
        campus: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 50]
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
        },
        user: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validator: {
                is: /^[A-Z]+$/
            },
            len: [5, 50]
        },
        cc: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validator: {
                is: /^[0-9]+$/
            },
            len: [7, 11]
        },
        phone: {
            type: Sequelize.STRING,
            validator: {
                is: /^[0-9]+$/
            },
            len: [7, 10]
        },
    }, {
        underscored: true,
        paranoid: true
    })
}