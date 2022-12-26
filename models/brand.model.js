const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('brand', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validates: { uniqueness: true },
            len: [2, 30]
        },
    }, {
        underscored: true,
        paranoid: true
    })
}