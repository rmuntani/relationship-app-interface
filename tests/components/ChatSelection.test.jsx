import { cleanup, render, fireEvent } from '@testing-library/react';
import React from 'react';
import ChatSelection from '../../src/components/ChatSelection';

/* eslint-disable */
jest.mock('../../src/components/ChatItem', () => function ({ user }) {
  return <div>{user.name}</div>;
});
/* eslint-enable */

describe('ChatSelection', () => {
  afterEach(cleanup);

  const baseProps = {
    error: '',
    selectUser: jest.fn(),
    success: null,
    users: [],
  };
  const users = [
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
  const propsWithUser = {
    ...baseProps,
    error: '',
    users,
    success: true,
  };

  it('should show a loading screen while request was not successful', () => {
    const { getByText } = render(<ChatSelection {...baseProps} />);

    getByText('Loading...');
  });

  it('should show an error when request was nos successful', () => {
    const propsWithError = {
      ...baseProps,
      error: 'It\'s raw!',
      success: false,
    };
    const { getByText } = render(<ChatSelection {...propsWithError} />);

    getByText(/It's raw!/);
  });

  it('should render users when the request was successful', () => {
    const { getByText } = render(<ChatSelection {...propsWithUser} />);

    getByText(/Paulo Freire/);
    getByText(/Ernesto Guevara/);
    getByText(/George Bush/);
    getByText(/Rene Descartes/);
  });

  it('should trigger a function when an username is clicked', () => {
    const { getByText } = render(<ChatSelection {...propsWithUser} />);
    const name = getByText(/Paulo Freire/);

    fireEvent.click(name);

    expect(propsWithUser.selectUser).toHaveBeenCalledWith(users[0]);
  });
});
