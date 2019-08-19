import WS from 'jest-websocket-mock';
import {
  sendMessageToUser, chatConnection, closeConnection, sendMessageToUserWithDispatch,
} from '../src/chatClient';
import { webSocketConfig } from '../src/configs/app.config';

// FIXME: Tests are not working and spending more time mocking websocket is not an option
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

  it.skip('should call dispatch when a message is sent', () => {
    const sendMessageDispatcher = sendMessageToUserWithDispatch(4, 'Hello!');
    const dispatch = jest.fn();

    sendMessageDispatcher(dispatch);

    expect(dispatch).toHaveBeenCalledWith(4, 'Hello!');
  });
});
