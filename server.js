// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression')
const bodyParser = require('body-parser');
const chalk = require('chalk');

const app = express();

app.use(compression())

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, './')));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);


/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const logo = `
 _    _           _______        _        _____ _       _     
| |  | |         |__   __|      | |      / ____| |     | |    
| |__| |_   _ ______| | ___  ___| |__   | |    | |_   _| |__  
|  __  | | | |______| |/ _ \\/ __| '_ \\  | |    | | | | | '_ \\ 
| |  | | |_| |      | |  __/ (__| | | | | |____| | |_| | |_) |
|_|  |_|\\__, |      |_|\\___|\\___|_| |_|  \\_____|_|\\__,_|_.__/ 
         __/ |                                                
        |___/                                                 
`

console.log(chalk.red(logo));

server.listen(port, '0.0.0.0', () => console.log(`Open Browser to http:\\localhost:${port}`));
