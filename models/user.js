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
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('resident', 'caregiver', 'staff', 'admin'),
      defaultValue: 'resident',
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergency_contact: {
      type: DataTypes.JSONB,  // Storing emergency contact as a JSON object (e.g., name, phone)
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,  // URL to the user's profile image (if any)
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};