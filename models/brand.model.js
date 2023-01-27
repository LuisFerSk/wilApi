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
            validate: {
                len: {
                    args: [2, 30],
                    msg: 'La marca deber tener de 2 a 30 caracteres.'
                }
            },
        },
    }, {
        underscored: true,
        paranoid: true
    })
}