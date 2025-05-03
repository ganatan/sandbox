import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Person = sequelize.define('Person', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'person', timestamps: false });

export default Person;
