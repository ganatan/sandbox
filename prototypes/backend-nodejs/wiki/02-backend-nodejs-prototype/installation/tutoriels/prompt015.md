  npm install dotenv


Modifier server.js

  ancienne version 

    import app from './app.js';

    const port = 3000;

    const server = app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

    export default server;

  nouvelle version    

    import app from './app.js';
    import dotenv from 'dotenv';
    dotenv.config();

    const PORT = process.env.PORT || 3000;

    const server = app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });

    export default server;

