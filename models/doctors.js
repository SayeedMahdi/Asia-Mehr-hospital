'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doctors.init({
    firstName: { allowNull: false, type: DataTypes.STRING },
    lastName: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, type: DataTypes.STRING },
    phone: { allowNull: false, type: DataTypes.STRING },
    specialist: { allowNull: false, type: DataTypes.STRING },
    experiece: { allowNull: false, type: DataTypes.INTEGER },
    age: { allowNull: false, type: DataTypes.INTEGER },
    about: { allowNull: false, type: DataTypes.STRING },
    role: { allowNull: false, type: DataTypes.INTEGER },
    photo: { allowNull: false, type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'Doctors',
  });
  return Doctors;
};