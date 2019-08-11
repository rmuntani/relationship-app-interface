import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Match from '../../src/components/Match';

/* Many ESLint rules are not useful for the mocks, and ignoring numerous specific rules
  would make the file bloated */

/* eslint-disable */
jest.mock('../../src/components/Button', () => function ({ click, image }) {
  return <img onClick={() => click()} alt={image.alt} />;
});

jest.mock('../../src/components/MatchModal', () => function ({ closeModal, user }) {
  return <div onClick={closeModal}>{user.name}</div>;
});

jest.mock('../../src/containers/Profile', () => function () {
  return <div />;
});
/* eslint-enable */

describe('Match', () => {
  afterEach(cleanup);

  const props = {
    closeModal: jest.fn(),
    dislikeUser: jest.fn(),
    error: 'It\'s wrong',
    hideDescription: jest.fn(),
    matchUser: {
      age: 75,
      name: 'Paulo Freire',
      image: {
        alt: 'Paulo, the educator',
        src: 'paulo.jpg',
      },
    },
    likeUser: jest.fn(),
    openMatch: false,
    requestUsers: jest.fn(),
    success: true,
    users: [{
      id: 1,
      images: [{
        src: 'ernesto.jpg',
        alt: 'Ernesto at the beach',
      }],
      description: {
        age: 39,
        name: 'Ernesto Guevara',
        text: 'I\'m a warrior',
      },
    },
    {
      id: 2,
      images: [{
        src: 'bush.jpg',
        alt: 'George grilling some meat',
      }],
      description: {
        age: 72,
        name: 'George Bush',
        text: 'Former US President',
      },
    }],
    userIndex: 0,
  };

  const propsWithMatchModal = {
    ...props,
    openMatch: true,
  };

  it('should call a function when component is first rendered', () => {
    render(<Match {...propsWithMatchModal} />);

    expect(props.requestUsers).toHaveBeenCalledTimes(1);
  });

  it('should show a match modal when openMatch flag is set', () => {
    // MatchModal used in this test is a mock
    const { getByText } = render(<Match {...propsWithMatchModal} />);

    getByText(/Paulo Freire/);
  });

  it('should call a Match component function when match modal is clicked', () => {
    // MatchModal used in this test is a mock
    const { getByText } = render(<Match {...propsWithMatchModal} />);
    const clickable = getByText(/Paulo Freire/);

    fireEvent.click(clickable);

    expect(propsWithMatchModal.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should show error when request failed', () => {
    const propsWithError = {
      ...props,
      error: 'It\'s wrong',
      success: false,
    };
    const { getByText } = render(<Match {...propsWithError} />);

    getByText(/It's wrong/);
  });

  it('should show that it is loading while the request has not ended', () => {
    const propsWithLoading = {
      ...props,
      success: null,
    };
    const { getByText } = render(<Match {...propsWithLoading} />);

    getByText(/Loading\.\.\./);
  });

  it('should call like/dislike functions when buttons are clicked', () => {
    const { getByAltText } = render(<Match {...props} />);
    const likeButton = getByAltText(/Like button/);
    const dislikeButton = getByAltText(/Dislike button/);

    fireEvent.click(likeButton);
    fireEvent.click(dislikeButton);

    expect(props.likeUser).toHaveBeenCalledTimes(1);
    expect(props.dislikeUser).toHaveBeenCalledTimes(1);
  });
});
