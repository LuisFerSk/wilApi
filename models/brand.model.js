const Sequelize = require('sequelize')

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
        type: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['equipment', 'printer_scanner']],
                    msg: 'El tipo de marca no es valida.'
                }
            },
        }
    }, {
        underscored: true,
    })
}