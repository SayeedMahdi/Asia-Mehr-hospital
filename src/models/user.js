'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName:{ type:DataTypes.STRING , allowNull:false},
    lastName: { type:DataTypes.STRING , allowNull:false},
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    createdAt:DataTypes.DATE,
    deleteAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};