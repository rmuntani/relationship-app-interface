import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import WS from 'jest-websocket-mock';
import ChatScreen from '../../src/components/ChatScreen';
import { webSocketConfig } from '../../src/configs/app.config';

describe('ChatScreen with WebSocket', () => {
  afterEach(cleanup);

  const server = new WS(webSocketConfig.server);

  const user = {
    id: 1,
    age: 75,
    name: 'Paulo Freire',
    image: {
      alt: 'It\'s me, Paulo',
      src: 'paulo.jpg',
    },
  };

  it('should receive a message from the websocket server and show it', (done) => {
    const { findByText } = render(<ChatScreen {...user} />);

    server.send('{ "id": 1, "text": "Hello everyone!"}');
    findByText(/Hello everyone!/).then(() => {
      done();
    });
  });

  it('should store sent messages and received messages', (done) => {
    const {
      container, debug, findByText, getByText,
    } = render(<ChatScreen {...user} />);
    const inputMessage = container.querySelector('input[type=\'text\']');
    const send = container.querySelector('button');

    fireEvent.change(inputMessage, { target: { value: 'Hello!' } });
    fireEvent.click(send);

    server.send('{ "id": 1, "text": "Hello my dear!"}');
    server.send('{ "id": 1, "text": "Let\'s eat!"}');

    findByText(/Hello!/)
      .then(() => {
        getByText(/Hello my dear!/);
        getByText(/Let's eat!/);
        done();
      })
      .catch(() => {
        debug();
        throw (new Error('Sent message could not be found'));
      });
  });
});
