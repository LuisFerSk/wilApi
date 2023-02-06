const Sequelize = require('sequelize-oracle')
const { CAMPUS, AREAS } = require('../config')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('printer_scanner', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[
                        'Impresora',
                        'Imp Sencilla',
                        'Imp Multifuncional Color',
                        'Imp Multifuncional BN',
                        'Scanner',
                    ]],
                    msg: 'El tipo de impresora o scanner no es valido.'
                }
            },
        },
        model: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 25],
                    msg: 'El modelo de la impresora o scanner debe ser una cadena de 2 a 25 caracteres.'
                }
            },
        },
        serial: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 25],
                    msg: 'El serial de la impresora o scanner debe ser una cadena de 3 a 25 caracteres.'
                }
            },
        },
        license_plate: {
            type: Sequelize.STRING,
            validator: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'La placa solo puede contener números.'
                },
                len: {
                    args: [4, 5],
                    msg: 'La placa debe tener de 4 a 5 dígitos.'
                },
            },
        },
        campus: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [CAMPUS],
                    msg: 'La sede no es valida.'
                }
            }
        },
        area: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [AREAS],
                    msg: 'La area no es valida.'
                }
            }
        },
        user: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-zA-Z ]+$/,
                    msg: 'El nombre del usuario solo puede contener letras.'
                },
                len: {
                    args: [5, 50],
                    msg: 'El nombre del usuario debe de ser una cadena de 5 a 50 caracteres.'
                },
            },
        },
        cc: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'la cédula del usuario solo puede contener números.'
                },
                len: {
                    args: [7, 11],
                    msg: 'La cédula del usuario debe tener de 7 a 11 dígitos.'
                }
            },
        },
        phone: {
            type: Sequelize.STRING,
            validate: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'la teléfono del usuario solo puede contener números.'
                },
                len: {
                    args: [7, 10],
                    msg: 'El teléfono del usuario debe tener de 7 a 10 dígitos.'
                }
            },
        },
    }, {
        underscored: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['cc'],
                
            },
            {
                unique: true,
                fields: ['serial']
            },
            {
                unique: true,
                fields: ['license_plate']
            },
        ]
    })
}