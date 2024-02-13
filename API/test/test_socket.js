import { test } from 'node:test';
import assert from 'node:assert';
import { getSocket } from '../Socket/socket.js';
import { WebSocket } from 'ws';
import { socketPort } from '../constants.js';

const socket_port = socketPort;
const socket = getSocket(socket_port);
var num = 0;
/**
 * Method to get a WebSocket
 * Tries to close the socket after getting a message
 * @param message is the message to send
 * @param testFunc is the function to run when testing
 */
function getWSocket(message, testFunc) {
  num++;
  const wsSocket = new WebSocket(`ws://localhost:${socket_port}`);

  wsSocket.onmessage = msg => {
    const gotten_message = JSON.parse(msg.data);
    wsSocket.close();
    closeSocket();
    testFunc(gotten_message)
  }

  wsSocket.onopen = () => {
    wsSocket.send(JSON.stringify(message));
  }
}

async function closeSocket() {
  num--;
  if (num === 0) {
    socket.terminate();
  }
}

test('test hello', () => {
  getWSocket({ message: "Hello" }, gotten_message => assert(gotten_message.message));
});

test('test goodbye', () => {
  getWSocket({ message: "Goodbye" }, gotten_message => assert(gotten_message.message));
});
