import WS from 'jest-websocket-mock';
import { sendMessageToUser, chatConnection, closeConnection } from '../src/chatClient';
import { webSocketConfig } from '../src/configs/app.config';

describe('chatClient', () => {
  const server = new WS(webSocketConfig.server);

  afterEach(() => {
    closeConnection();
  });

  it('should send a message to the server', () => {
    chatConnection();
    sendMessageToUser('Hello', 4);

    expect(server).toReceiveMessage({ id: 4, message: 'Hello' });
  });

  it('should send a message regardless of starting connection', () => {
    sendMessageToUser('Hello', 4);

    expect(server).toReceiveMessage({ id: 4, message: 'Hello' });
  });

  it('should send a message regardless of starting connection', () => {
    sendMessageToUser('Hello', 4);

    expect(server).toReceiveMessage({ id: 4, message: 'Hello' });
  });
});
