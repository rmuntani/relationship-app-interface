import axios from 'axios';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import ChatSelection from '../../src/containers/ChatSelection';
import relationship from '../../src/reducers';
import { mockBeforeMatchedUsersAPICall } from '../mocks/baseStateMock';

jest.mock('axios');

describe('ChatSelection', () => {
  afterEach(cleanup);

  const ChatSelectionWithStore = () => {
    const store = createStore(
      relationship,
      mockBeforeMatchedUsersAPICall(),
      applyMiddleware(thunkMiddleware),
    );

    return (
      <Provider store={store}>
        <ChatSelection />
      </Provider>
    );
  };

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

  it('should have users listed with their pictures, name and age', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { getByAltText, getByText } = render(<ChatSelectionWithStore />);

    setImmediate(() => {
      getByText(/Paulo Freire/);
      getByText(/75/);
      getByAltText(/It's me, Paulo/);

      getByText(/Ernesto Guevara/);
      getByText(/39/);
      getByAltText(/Ernesto at the beach/);

      getByText(/George Bush/);
      getByText(/72/);
      getByAltText(/George grilling some meat/);

      getByText(/Rene Descartes/);
      getByText(/53/);
      getByAltText(/Rene discarding some trash/);
      done();
    });
  });

  it('should show when server response is not ok', (done) => {
    axios.get.mockResolvedValue({ data: null, status: 500 });
    const { getByText } = render(<ChatSelectionWithStore />);

    setImmediate(() => {
      getByText(/We're experimenting technical difficulties. Please try again latter./);
      done();
    });
  });

  it('should show that network has problems if the first request failed', (done) => {
    axios.get.mockReturnValue(Promise.reject(new Error('Network is bad!')));

    const { getByText } = render(<ChatSelectionWithStore />);

    setImmediate(() => {
      getByText(/Network problems detected. Please try again latter./);
      done();
    });
  });
});
