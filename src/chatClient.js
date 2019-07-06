const connection = new WebSocket('ws://127.0.0.1:1337');

export default function chatClient(handleEvents) {
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  connection.onclose = () => handleEvents.onclose();
  connection.onopen = () => handleEvents.onclose();
  connection.onerror = error => handleEvents.onerror(error);
  connection.onmessage = message => handleEvents.onmessage(message);
}

export function sendMessageToUser(message, id) {
  if (connection === undefined || connection === null) return;

  connection.send({ message, id });
}
