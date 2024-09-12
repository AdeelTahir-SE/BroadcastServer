#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runServer } from './server'; // Import your server function
import { io } from 'socket.io-client';
import readline from 'readline';
import chalk from "chalk"
let PORT: number = 5001; // Default port

 
// Initialize yargs
const Yargs = yargs(hideBin(process.argv));

Yargs.command(
  'start [PORT]',
  'This command will start running the server',
  (yargs) => {
    return yargs.positional('PORT', {
      type: 'number',
      default: 5001,
      describe: 'Port at which the server should start listening',
    });
  },
  (args) => {
    const port = args.PORT as number;

    if (isNaN(port) || port <= 0 || port > 65535) {
      console.log('Please provide a valid port number between 1 and 65535');
      return;
    }

    console.log(`Starting server on port ${port}`);
    PORT = port;
    runServer(port); // Start the server
  }
)
.command(
  'connect [name]',
  'This command connects the client to the server and allows interactive messaging',
  (yargs) => {
    return yargs.positional("name",{
      type: 'string',
      default: 'client',
      describe: 'Name of the client'
    })
  },
  (args) => {
  
  
    console.log(chalk.green(`Connecting to server at http://localhost:${PORT}...`));

    const socket = io(`http://localhost:${PORT}`); // Connect to the Socket.IO server

    // Event listener for successful connection
    socket.on('connect', () => {
      console.log(chalk.green('Connected! Type your message and press Enter to send. Type "exit" to disconnect.'));
    
      // Set up readline interface for interactive input
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });


      rl.on('line', (input) => {
        if (input.trim().toLowerCase() === 'exit') {
          console.log(chalk.red('Disconnecting from server...'));
          socket.disconnect();
          rl.close();
        } else {
          socket.emit('message', {input,name:args.name});
        }
      });

      // Handle errors with readline
      rl.on('error', (err) => {
        console.error(chalk.red(`Readline error: ${err.message}`));
      });
    });
let id =0;
    // Handle messages from the server

   socket.on('message', (message: string) => {
  const name = message.split(" ");
  
  if (name[0] == args.name) {
    const Message = message.replace(args.name, "You");
    console.log(chalk.blue(`${id}- ${Message}`));
    id++;
  } else {
    console.log(chalk.yellow(`${id}`), chalk.blue(`- ${message}`));
    id++;
  }
});


socket.on('previousMessages', (serverMessages: string[]) => {
  console.log(chalk.yellow('Previous messages:'));
  for (const message of serverMessages) {
    console.log(chalk.grey(message));
  }
});

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error(chalk.red(`Connection error: ${error.message}`));
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(chalk.red('Disconnected from server'));
    });
  }
)
.parse();
