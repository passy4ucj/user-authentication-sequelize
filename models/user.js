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
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
    }

    toJSON(){
      return { ...this.get(), id: undefined, password: undefined }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have an email' },
        notEmpty: { msg: 'email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' }
      }
    },
    role: {
      type: DataTypes.ENUM('supervisor', 'admin', 'user'),
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an role' },
        notEmpty: { msg: 'role must not be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an password' },
        notEmpty: { msg: 'password must not be empty' }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};