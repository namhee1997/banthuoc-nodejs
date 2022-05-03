'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            specialtyid: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long')
            },
            description: {
                type: Sequelize.TEXT('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Markdowns');
    }
};