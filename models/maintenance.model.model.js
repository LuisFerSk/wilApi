const Sequelize = require('sequelize-oracle')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('maintenance', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            len: [6],
            required: true,
        },
        date: {
            type: Sequelize.DATEONLY,
            required: true,
            allowNull: false
        },
        workstation: {
            type: Sequelize.STRING,
            len: [3, 30]
        },
        ignition_station: {
            type: Sequelize.BOOLEAN,
        },
        operating_system_boot: {
            type: Sequelize.BOOLEAN,
        },
        HDD: {
            type: Sequelize.BOOLEAN,
        },
        CD_rom_DVD: {
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
        remove_indoor_dust: {
            type: Sequelize.BOOLEAN,
        },
        check_internal_connections: {
            type: Sequelize.BOOLEAN,
        },
        clean_keyboard: {
            type: Sequelize.BOOLEAN,
        },
        clean_monitor: {
            type: Sequelize.BOOLEAN,
        },
        clean_mouse: {
            type: Sequelize.BOOLEAN,
        },
        connect_power_peripheral_cables: {
            type: Sequelize.BOOLEAN,
        },
        close_PC_clean_case: {
            type: Sequelize.BOOLEAN,
        },
        end_ignition_station: {
            type: Sequelize.BOOLEAN,
        },
        end_operating_system_boot: {
            type: Sequelize.BOOLEAN,
        },
        end_HDD: {
            type: Sequelize.BOOLEAN,
        },
        end_CD_rom_DVD: {
            type: Sequelize.BOOLEAN,
        },
        end_display: {
            type: Sequelize.BOOLEAN,
        },
        end_mouse: {
            type: Sequelize.BOOLEAN,
        },
        end_keyboard: {
            type: Sequelize.BOOLEAN,
        },
        error_description: {
            type: Sequelize.STRING,
            len: [0, 200]
        },
        check_anti_virus: {
            type: Sequelize.BOOLEAN,
        },
        deletion_temporary_cookies: {
            type: Sequelize.BOOLEAN,
        },
        disk_defragmentation: {
            type: Sequelize.BOOLEAN,
        },
        equipment_delivery: {
            type: Sequelize.BOOLEAN,
        },
        Q1: {
            type: Sequelize.STRING,
            validator: {
                isIn: [['buena', 'regular', 'malo']]
            }
        },
        Q2: {
            type: Sequelize.STRING,
            validator: {
                isIn: [['buena', 'regular', 'malo']]
            }
        },
        Q3: {
            type: Sequelize.STRING,
            validator: {
                isIn: [['buena', 'regular', 'malo']]
            }
        }, observations: {
            type: Sequelize.STRING,
            len: [0, 200]
        }
    }, {
        underscored: true,
        paranoid: true
    })
}