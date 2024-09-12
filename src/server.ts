import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from "cors";
import chalk from "chalk"
// Initialize Express app
const app = express();
app.use(cors());

// Create HTTP server
const server = createServer(app);
const messages: string[] = [];

// Initialize Socket.IO server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow all origins (you can restrict this to specific domains if needed)
  },
});

// Handle new WebSocket connections
io.on('connection', (client: Socket) => {
  console.log(chalk.cyanBright('A user has connected with id:'), chalk.greenBright(client.id));
  client.emit('previousMessages', messages);

  // Handle incoming messages
  client.on('message', (msg: any) => {
    io.emit('message', `${msg.name?msg.name:client.id} sent: ${msg.input}`);
    messages.push(`${msg.name?msg.name:client.id} sent: ${msg.input}`)
    console.log(chalk.greenBright(`${msg.name?msg.name:client.id}`), chalk.cyanBright(`sent: ${msg.input}`))
  });


  // Handle disconnections
  client.on('disconnect', () => {
    console.log(chalk.red('A user has disconnected'));
  });
});

// Function to start the server
export function runServer(PORT: number) {
  server.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on port ${PORT}`));
  });
}
