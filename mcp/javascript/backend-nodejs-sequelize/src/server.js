import app from './app.js';
import sequelize from './config/sequelize.js';

const { PORT } = process.env;

sequelize.authenticate().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
}).catch(error => console.error('Database connection failed', error));
