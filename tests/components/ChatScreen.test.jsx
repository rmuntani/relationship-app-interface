import { cleanup, render, fireEvent } from '@testing-library/react';
import React from 'react';
import ChatScreen from '../../src/components/ChatScreen';

jest.mock('../../src/chatClient', () => ({
  sendMessageToUser: jest.fn(),
  chatConnection: jest.fn(),
}));

/* eslint-disable */
jest.mock('../../src/components/ChatItem', () => function ({ user }) {
  return (
    <div>
      <img src={user.image.src} alt={user.image.alt} />
      <div>{`${user.name}, ${user.age}`}</div>
    </div>
  );
});

jest.mock('../../src/components/Message', () => function ({ messages }) {
  return (
    messages.map((message, index) => (
      <div key={index}>{message.message}</div>
    ))
  );
});
/* eslint-enable */

describe('ChatScreen', () => {
  afterEach(cleanup);

  const user = {
    id: 1,
    age: 75,
    name: 'Paulo Freire',
    image: {
      alt: 'It\'s me, Paulo',
      src: 'paulo.jpg',
    },
  };

  const props = {
    messages: [
      { id: 1, message: 'Hello' },
      { id: -1, message: 'How you doing?' },
    ],
    receiveMessage: jest.fn(),
    sendMessageToUser: jest.fn(),
    user,
  };

  it('should render the user basic description', () => {
    const { getByAltText, getByText } = render(<ChatScreen {...props} />);

    getByText(/Paulo Freire, 75/);
    getByAltText(/It's me, Paulo/);
  });

  it('should render messages', () => {
    const { getByText } = render(<ChatScreen {...props} />);

    getByText(/Hello/);
    getByText(/How you doing\?/);
  });

  it('should call sendMessageToUser when a message is sent', () => {
    const { getByText } = render(<ChatScreen {...props} />);
    const button = getByText(/Send/);

    fireEvent.click(button);

    expect(props.sendMessageToUser).toHaveBeenCalledTimes(1);
  });

  it('should empty the input when a message is sent', () => {
    const { container, getByText } = render(<ChatScreen {...props} />);
    const inputMessage = container.querySelector('input[type=\'text\']');
    const button = getByText(/Send/);

    fireEvent.change(inputMessage, { target: { value: 'Hello!' } });
    fireEvent.click(button);

    expect(inputMessage.value).toEqual('');
  });
});

// TODO: transfer test to a component
// describe('ChatScreen without WebSocket', () => {
//   afterEach(cleanup);

//   it('should send a message to the websocket server', () => {
//     const user = {
//       id: 1,
//       age: 75,
//       name: 'Paulo Freire',
//       image: {
//         alt: 'It\'s me, Paulo',
//         src: 'paulo.jpg',
//       },
//     };
//     const { container } = render(<ChatScreen {...user} />);
//     const inputMessage = container.querySelector('input[type=\'text\']');
//     const send = container.querySelector('button');

//     fireEvent.change(inputMessage, { target: { value: 'Hello...?' } });
//     fireEvent.click(send);

//     expect(sendMessageToUser).toHaveBeenCalledWith('Hello...?', 1);
//     expect(inputMessage.value).toEqual('');
//   });
// });
