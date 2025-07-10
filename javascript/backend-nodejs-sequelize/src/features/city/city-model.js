import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const City = sequelize.define('City', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'city', timestamps: false });

export default City;
