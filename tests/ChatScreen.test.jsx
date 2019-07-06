import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import ChatScreen from '../src/ChatScreen';
import { sendMessageToUser } from '../src/chatClient';

jest.mock('../src/chatClient', () => ({
  sendMessageToUser: jest.fn(),
  chatConnection: jest.fn(),
}));

describe('ChatScreen without WebSocket', () => {
  afterEach(cleanup);

  it('should send a message to the websocket server', () => {
    const user = {
      id: 1,
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'It\'s me, Paulo',
        src: 'paulo.jpg',
      },
    };
    const { container } = render(<ChatScreen {...user} />);
    const inputMessage = container.querySelector('input[type=\'text\']');
    const send = container.querySelector('button');

    fireEvent.change(inputMessage, { target: { value: 'Hello...?' } });
    fireEvent.click(send);

    expect(sendMessageToUser).toHaveBeenCalledWith('Hello...?', 1);
    expect(inputMessage.value).toEqual('');
  });
});
