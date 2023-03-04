const Sequelize = require('sequelize')
const { CAMPUS, AREAS, TYPES_PRINTER_SCANNER, ACQUIRED_BY, STATES } = require('../config')

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
                    args: [TYPES_PRINTER_SCANNER],
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
            unique: true,
            validate: {
                len: {
                    args: [3, 25],
                    msg: 'El serial de la impresora o scanner debe ser una cadena de 3 a 25 caracteres.'
                }
            },
        },
        licensePlate: {
            type: Sequelize.STRING,
            unique: true,
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
        owner: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-zA-Z ]+$/,
                    msg: 'El nombre del propietario solo puede contener letras.'
                },
                len: {
                    args: [5, 50],
                    msg: 'El nombre del propietario debe de ser una cadena de 5 a 50 caracteres.'
                },
            },
        },
        state: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [STATES],
                    msg: 'El estado no es valido.'
                }
            }
        },
        acquiredBy: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [ACQUIRED_BY],
                    msg: 'El método de adquisición no es valido.'
                }
            }
        },
        ip: {
            type: Sequelize.STRING,
        },
        dateOfPurchaseOrRental: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false,
        },
        warrantyEndDate: {
            type: Sequelize.DATE,
            validate: {
                isGreaterThanOtherField: (value) => {
                    if (value < this.date_of_purchase) {
                        throw new Error('La fecha de finalización de la garantía no puede ser menor a la fecha de compra.')
                    }
                }
            },
        },
    }, {
        underscored: true,
    })
}