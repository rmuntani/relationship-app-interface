import { cleanup, render } from '@testing-library/react';
import React from 'react';
import WS from 'jest-websocket-mock';
import ChatScreen from '../src/ChatScreen';
import { webSocketConfig } from '../src/app.config';

describe('ChatScreen with WebSocket', () => {
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

  it('should receive a message from the websocket server and show it', (done) => {
    const server = new WS(webSocketConfig.server);
    const { findByText } = render(<ChatScreen {...user} />);

    server.send('Hello everyone!');
    findByText(/Hello everyone!/).then(() => {
      done();
    });
  });
});
