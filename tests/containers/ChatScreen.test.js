import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import WS from 'jest-websocket-mock';
import ChatScreen from '../../src/containers/ChatScreen';
import { webSocketConfig } from '../../src/configs/app.config';
import relationship from '../../src/reducers';
import { mockWithMatchedUser } from '../mocks/baseStateMock';

describe('ChatScreen with WebSocket', () => {
  afterEach(cleanup);

  const server = new WS(webSocketConfig.server);

  const ChatScreenWithStore = () => {
    const user = [{
      id: 1,
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'It\'s me, Paulo',
        src: 'paulo.jpg',
      },
    }];

    const store = createStore(
      relationship,
      mockWithMatchedUser(user, 1),
      applyMiddleware(thunkMiddleware),
    );

    return (
      <Provider store={store}>
        <ChatScreen />
      </Provider>
    );
  };

  it('should receive a message from the websocket server and show it', (done) => {
    const { findByText } = render(<ChatScreenWithStore />);

    server.send('{ "id": 1, "message": "Hello everyone!"}');
    findByText(/Hello everyone!/).then(() => {
      done();
    });
  });

  it('should store sent messages', (done) => {
    const {
      container, findByText,
    } = render(<ChatScreenWithStore />);
    const inputMessage = container.querySelector('input[type=\'text\']');
    const send = container.querySelector('button');

    fireEvent.change(inputMessage, { target: { value: 'Hello!' } });
    fireEvent.click(send);

    findByText(/Hello!/).then(() => {
      done();
    });
  });

  it('should store sent messages and received messages', (done) => {
    const {
      container, debug, findByText, getByText,
    } = render(<ChatScreenWithStore />);
    const inputMessage = container.querySelector('input[type=\'text\']');
    const send = container.querySelector('button');

    fireEvent.change(inputMessage, { target: { value: 'Hello!' } });
    fireEvent.click(send);

    server.send('{ "id": 1, "message": "Hello my dear!"}');
    server.send('{ "id": 1, "message": "Let\'s eat!"}');

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
