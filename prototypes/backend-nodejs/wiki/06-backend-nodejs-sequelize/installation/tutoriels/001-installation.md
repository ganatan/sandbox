
  npm install pg sequelize pg-hstore

    import express from 'express';
    import { Sequelize, DataTypes } from 'sequelize';
    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();

    const { PORT, DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

    let url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    const sequelize = new Sequelize(url);

    const Person = sequelize.define('Person', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    }, { tableName: 'person', timestamps: false });

    app.get('/persons', async (req, res) => {
      try {
        const persons = await Person.findAll({ attributes: ['id', 'name'] });
        res.json(persons);
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
    });

    const start = async () => {
      try {
        await sequelize.authenticate();
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
      } catch (error) {
        console.error('Database connection failed', error);
      }
    };

    start();
