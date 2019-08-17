import { webSocketConfig } from './configs/app.config';
import { updateMessages } from './actions';

let connection = null;
let connectionPromise = null;
let connectionOpen = false;

function initializeConnection() {
  if (!connectionOpen) {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    connection = new WebSocket(webSocketConfig.server);
    connectionPromise = new Promise(
      (
        (resolve, reject) => {
          connection.onopen = () => resolve(true);
          connection.error = () => reject(false);
        }
      ),
    )
      .then(() => {
        connectionOpen = true;
      })
      .catch(() => {
        connectionOpen = false;
      });
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
      connection.send(JSON.stringify({ text: message, id }));
    })
    .catch(() => {
      connectionOpen = false;
    });
}

// For testing purposes only
export function closeConnection() {
  connection.close();
}

export function sendMessageToUserWithDispatch(id, message) {
  return function (dispatch) {
    if (!connectionOpen) {
      initializeConnection();
    }

    connectionPromise
      .then(() => {
        dispatch(updateMessages(id, message));
        connection.send(JSON.stringify({ text: message, id }));
      })
      .catch(() => {
        connectionOpen = false;
      });
  };
}
