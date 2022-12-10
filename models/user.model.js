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
            unique: true,
            len: [5, 20]
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [8, 50]
        }
    }, {
        underscored: true,
        paranoid: true
    })
}