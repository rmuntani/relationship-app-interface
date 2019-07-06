import { webSocketConfig } from './app.config';

let connection = null;
let connectionPromise = null;
let connectionOpen = false;

export function initializeConnection() {
  if (!connectionOpen) {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    connection = new WebSocket(webSocketConfig.server);
    connectionPromise = new Promise(((resolve, reject) => {
      connection.onopen = () => resolve(true);
      connection.error = () => reject(false);
    }));
  }
}

export function chatConnection(handleEvents) {
  initializeConnection();

  connection.onclose = () => handleEvents.onClose();
  connection.onmessage = message => handleEvents.onMessage(message);
}

export function sendMessageToUser(message, id) {
  if (!connectionOpen) {
    initializeConnection();
  }

  connectionPromise
    .then(() => {
      connection.send({ message, id });
    })
    .catch(() => {
      connectionOpen = false;
    });
}
