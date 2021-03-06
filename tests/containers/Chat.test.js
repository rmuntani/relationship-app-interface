import axios from 'axios';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Chat from '../../src/containers/Chat';
import relationship from '../../src/reducers';
import { mockBeforeMatchedUsersAPICall } from '../mocks/baseStateMock';

jest.mock('axios');

describe('Chat', () => {
  afterEach(cleanup);

  const usersData = [
    {
      id: 1,
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'It\'s me, Paulo',
        src: 'paulo.jpg',
      },
    },
    {
      id: 2,
      age: 39,
      name: 'Ernesto Guevara',
      image: {
        alt: 'Ernesto at the beach',
        src: 'ernesto.jpg',
      },
    },
    {
      id: 3,
      age: 72,
      name: 'George Bush',
      image: {
        alt: 'George grilling some meat',
        src: 'bush.jpg',
      },
    },
    {
      id: 4,
      age: 53,
      name: 'Rene Descartes',
      image: {
        alt: 'Rene discarding some trash',
        src: 'rene.jpg',
      },
    },
  ];

  const ChatWithStore = () => {
    const store = createStore(
      relationship,
      mockBeforeMatchedUsersAPICall(),
      applyMiddleware(thunkMiddleware),
    );

    return (
      <Provider store={store}>
        <Chat />
      </Provider>
    );
  };

  it('should open chat screen when list item is clicked', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { getByAltText, getByText, queryByText } = render(<ChatWithStore />);

    setImmediate(() => {
      const image = getByAltText(/It's me, Paulo/);

      fireEvent.click(image);

      getByText(/Paulo Freire/);
      getByText(/75/);

      /* Chat screen should have a send button */
      getByText(/Send/);

      expect(queryByText(/Ernesto Guevara/)).toBeNull();
      expect(queryByText(/George Bush/)).toBeNull();
      expect(queryByText(/Rene Descartes/)).toBeNull();
      done();
    });
  });
});
