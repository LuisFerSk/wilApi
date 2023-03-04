const Sequelize = require('sequelize')
const { CAMPUS, AREAS, RAM_MEMORY_TYPES, HARD_DRIVE_TYPES, PROCESSOR_TYPES, TYPES_EQUIPMENT, STATES } = require('../config')

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
                    args: [TYPES_EQUIPMENT],
                    msg: 'El tipo de equipo no es valido.'
                }
            },

        },
        processorType: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [PROCESSOR_TYPES],
                    msg: 'El tipo de procesador no es valida.'
                }
            }
        },
        processorModel: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 25],
                    msg: 'El modelo del equipo debe ser una cadena de 2 a 25 caracteres.'
                }
            }
        },
        ramMemoryCapacity: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'La capacidad de la memoria RAM solo puede contener números.'
                },
                len: {
                    args: [1, 2],
                    msg: 'La capacidad de la memoria RAM debe tener máximo 2 dígitos.'
                }
            }
        },
        ramMemoryType: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [RAM_MEMORY_TYPES],
                    msg: 'El tipo de memoria RAM no es valida.'
                }
            }
        },
        hardDriveCapacity_1: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'La capacidad del disco duro 1 solo puede contener números.'
                },
                len: {
                    args: [1, 4],
                    msg: 'La capacidad del disco duro 1 debe tener máximo 4 dígitos.'
                }
            }
        },
        hardDriveType_1: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                isIn: {
                    args: [HARD_DRIVE_TYPES],
                    msg: 'El tipo de disco duro 1 no es valida.'
                }
            }
        },
        hardDriveCapacity_2: {
            type: Sequelize.STRING,
            validate: {
                is: {
                    args: /^[0-9]+$/,
                    msg: 'La capacidad del disco duro 2 solo puede contener números.'
                },
                len: {
                    args: [1, 4],
                    msg: 'La capacidad del disco duro 2 debe tener máximo 4 dígitos.'
                }
            }
        },
        hardDriveType_2: {
            type: Sequelize.STRING,
            validate: {
                isIn: {
                    args: [HARD_DRIVE_TYPES],
                    msg: 'El tipo de disco duro 2 no es valida.'
                }
            }
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
            unique: true,
            required: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 25],
                    msg: 'El serial del equipo debe ser una cadena de 3 a 25 caracteres.'
                }
            },
        },
        licensePlate: {
            type: Sequelize.STRING,
            unique: true,
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
        monitorModel: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [3, 25],
                    msg: 'El modelo de monitor del equipo debe ser una cadena de 3 a 25 caracteres.'
                }
            }
        },
        dateOfPurchase: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false,
        },
        warrantyEndDate: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false,
            validate: {
                isGreaterThanOtherField: (value) => {
                    if (value < this.date_of_purchase) {
                        throw new Error('La fecha de finalización de la garantía no puede ser menor a la fecha de compra.')
                    }
                }
            },
        },
        monitorSerial: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                len: {
                    args: [3, 25],
                    msg: 'El serial del monitor del equipo debe ser una cadena de 3 a 25 caracteres.'
                }
            }
        },
        monitorLicensePlate: {
            type: Sequelize.STRING,
            unique: true,
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
            unique: true,
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
        }
    }, {
        underscored: true,
    })
}