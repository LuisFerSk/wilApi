const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('equipment', {
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
                        'All in one',
                        'Desktop',
                        'Laptop',
                        'Workstation',
                        'Tablet iOS',
                    ]],
                    msg: 'El tipo de equipo no es valido.'
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
                    msg: 'El modelo del equipo debe ser una cadena de 2 a 25 caracteres.'
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
                    msg: 'El serial del equipo debe ser una cadena de 3 a 25 caracteres.'
                }
            },
        },
        license_plate: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
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
        monitor_serial: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [3, 25],
                    msg: 'El serial del monitor del equipo debe ser una cadena de 3 a 25 caracteres.'
                }
            }
        },
        monitor_license_plate: {
            type: Sequelize.STRING,
            validate: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'La placa del monitor solo puede contener números.'
                },
                len: {
                    args: [4, 5],
                    msg: 'La placa del monitor debe tener de 4 a 5 dígitos.'
                },
            }
        },
        campus: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[
                        'VALLEDUPAR',
                        'AGUACHICA',
                        'CURUMANI',
                        'CHIMICHAGUA',
                        'JAGUA DE IBIRICO',
                    ]],
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
                    args: [[
                        'DIRECCIÓN GENERAL',
                        'SECRETARIA GENERAL',
                        'OFICINA JURÍDICA',
                        'OFICINA CONTROL INTERNO',
                        'ASESOR DIRECCIÓN GENERAL',
                        'OFICINA DE SISTEMAS Y TICS',
                        'SUBDIRECCIÓN GENERAL ÁREA DE PLANEACIÓN',
                        'SUBDIRECCIÓN GENERAL ÁREA DE GESTIÓN AMBIENTAL',
                        'SUBDIRECCIÓN GENERAL ÁREA ADMINISTRATIVA Y FINANCIERA',
                        'GESTIÓN FINANCIERA',
                        'CONTABILIDAD',
                        'TESORERIA',
                        'PAGADURIA',
                        'VENTANILLA ÚNICA',
                    ]],
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
                fields: ['cc']
            },
            {
                unique: true,
                fields: ['serial']
            }
        ]
    })
}