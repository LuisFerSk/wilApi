const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment_user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
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
            len:[7,10]
        }
    }, {
        underscored: true,
        paranoid: true
    })
}