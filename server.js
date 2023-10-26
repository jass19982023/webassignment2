#!/usr/bin/env node

/**
 * module dependencies
 */

var app = require('./server/config/app');
var debug = require('debug')('portfolio:server');
var http = require('http');

/**
 * get port from environment and store it in Express
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * create HTTP server
 */

var server = http.createServer(app);

/**
 * listen on provided port
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * normalize a port (number, string, or false)
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipe
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;
}

/**
 *event listener for "error" event
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  //to handle specific listen errors
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * event listener for "listening" event
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
