const Sequelize = require('sequelize')
const { QUESTION_OPTIONS } = require('../config')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('maintenance', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            required: true,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        date: {
            type: Sequelize.DATEONLY,
            required: true,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 50],
                    msg: 'La ciudad debe ser una cadena de 2 a 50 caracteres.'
                }
            }
        },
        workstation: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [3, 30],
                    msg: 'La estación de trabajo debe ser una cadena de 3 a 30 caracteres.'
                }
            }
        },
        ignitionStation: {
            type: Sequelize.BOOLEAN,
        },
        operatingSystemBoot: {
            type: Sequelize.BOOLEAN,
        },
        HDD: {
            type: Sequelize.BOOLEAN,
        },
        cdRomDvd: {
            type: Sequelize.BOOLEAN,
        },
        display: {
            type: Sequelize.BOOLEAN,
        },
        mouse: {
            type: Sequelize.BOOLEAN,
        },
        keyboard: {
            type: Sequelize.BOOLEAN,
        },
        removeIndoorDust: {
            type: Sequelize.BOOLEAN,
        },
        checkInternalConnections: {
            type: Sequelize.BOOLEAN,
        },
        cleanKeyboard: {
            type: Sequelize.BOOLEAN,
        },
        cleanMonitor: {
            type: Sequelize.BOOLEAN,
        },
        cleanMouse: {
            type: Sequelize.BOOLEAN,
        },
        connectPowerPeripheralCables: {
            type: Sequelize.BOOLEAN,
        },
        closePcCleanCase: {
            type: Sequelize.BOOLEAN,
        },
        endIgnitionStation: {
            type: Sequelize.BOOLEAN,
        },
        endOperatingSystemBoot: {
            type: Sequelize.BOOLEAN,
        },
        endHdd: {
            type: Sequelize.BOOLEAN,
        },
        endCdRomDvd: {
            type: Sequelize.BOOLEAN,
        },
        endDisplay: {
            type: Sequelize.BOOLEAN,
        },
        endMouse: {
            type: Sequelize.BOOLEAN,
        },
        endKeyboard: {
            type: Sequelize.BOOLEAN,
        },
        errorDescription: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'La descripción del error encontrado debe ser una cadena de máximo 200 caracteres.'
                }
            }
        },
        endErrorDescription: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'La descripción final del error encontrado debe ser una cadena de máximo 200 caracteres.'
                }
            }
        },
        checkAntiVirus: {
            type: Sequelize.BOOLEAN,
        },
        deletionTemporaryCookies: {
            type: Sequelize.BOOLEAN,
        },
        diskDefragmentation: {
            type: Sequelize.BOOLEAN,
        },
        equipmentDelivery: {
            type: Sequelize.BOOLEAN,
        },
        question_1: {
            type: Sequelize.STRING,
            validate: {
                isIn: {
                    args: [QUESTION_OPTIONS],
                    msg: 'La respuesta de la primera pregunta no es valida.'
                }
            }
        },
        question_2: {
            type: Sequelize.STRING,
            validate: {
                isIn: {
                    args: [QUESTION_OPTIONS],
                    msg: 'La respuesta de la segunda pregunta no es valida.'
                }
            }
        },
        question_3: {
            type: Sequelize.STRING,
            validate: {
                isIn: {
                    args: [QUESTION_OPTIONS],
                    msg: 'La respuesta de la tercera pregunta no es valida.'
                }
            }
        },
        observations: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [0, 200],
                    msg: 'Las observaciones debe ser una cadena de máximo 200 caracteres.'
                }
            }
        },
        signature: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    }, {
        underscored: true,
    })
}