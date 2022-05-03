'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Markdown.belongsTo(models.User, { foreignKey: 'doctorId' })
        }
    };
    Markdown.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyid: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};