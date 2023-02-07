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
            validate: {
                len: {
                    args: [5, 20],
                    msg: 'El nombre de usuario debe tener de 5 a 20 caracteres.'
                }
            },
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['administrator', 'support']],
                    msg: 'El rol no es valido.'
                }
            }
        }
    }, {
        underscored: true,
        paranoid: true
    })
}