const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validates: { uniqueness: true },
            len: [5, 20]
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [8, 50]
        },
        role: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validator: {
                isIn: [['administrator', 'support']]
            }
        }
    }, {
        underscored: true,
        paranoid: true
    })
}