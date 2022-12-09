const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [3, 25]
        },
    }, {
        underscored: true,
        paranoid: true
    })
}