import { createServer } from 'http';
import process from 'node:process';
import app from './app';
import { Server } from 'socket.io';
import { sequelize } from './models';

const port = process.env.PORT || 8081;
const server = createServer(app);
export const io = new Server();

(async () => {
  try {
    io.attach(server, {
      cors: {
        origin: ['*'],
      },
    });

    await sequelize.sync({ alter: true });
    server.listen(port, () => {
      console.info(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    console.error('Unable to connect to the database:', error);
  }
})();
