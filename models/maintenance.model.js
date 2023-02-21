const Sequelize = require('sequelize-oracle')

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
        },
        workstation: {
            type: Sequelize.STRING,
            validate: {
                len: [3, 30]
            }
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
        },
        end_error_description: {
            type: Sequelize.STRING,
            validate: {
                len: [0, 200]
            }
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
        },
        Q2: {
            type: Sequelize.STRING,
        },
        Q3: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        observations: {
            type: Sequelize.STRING,
        },
        signature: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }
    }, {
        underscored: true,
        paranoid: true,
    })
}