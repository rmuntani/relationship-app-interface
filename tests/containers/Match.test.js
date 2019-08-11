import axios from 'axios';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { cleanup, render, fireEvent } from '@testing-library/react';
import Match from '../../src/containers/Match';
import { request } from '../../src/configs/app.config';
import relationship from '../../src/reducers';
import { mockBeforeAPICall } from '../mocks/baseStateMock';

jest.mock('axios');

describe('Match', () => {
  afterEach(() => cleanup());

  const MatchWithStore = () => {
    const store = createStore(relationship, mockBeforeAPICall(), applyMiddleware(thunkMiddleware));

    return (
      <Provider store={store}>
        <Match />
      </Provider>
    );
  };

  const usersData = [
    {
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
    },
  ];

  it('should receive users data and show it', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { container, getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      const image = container.querySelector('img[src=\'ernesto.jpg\']');
      expect(image.alt).toEqual('Ernesto at the beach');
      getByText(/Ernesto Guevara/);
      getByText(/39/);
      done();
    });
  });

  it('should change users and make requests according to pressed buttons', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({ data: '', status: 200 });

    const { container, getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      // First user
      const likeButton = container.querySelector('img[alt=\'Like button\']');
      const ernestoImage = container.querySelector('img[src=\'ernesto.jpg\']');

      expect(ernestoImage.alt).toEqual('Ernesto at the beach');
      getByText(/39/);

      fireEvent.click(likeButton);

      // Second user
      const bushImage = container.querySelector('img[src=\'bush.jpg\']');
      expect(bushImage.alt).toEqual('George grilling some meat');
      getByText(/George Bush/);
      getByText(/72/);
      done();
    });
  });

  it('should send a request to the right url depending on what button was clicked', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({ data: '', status: 200 });
    const { container } = render(<MatchWithStore />);

    setImmediate(() => {
      const likeButton = container.querySelector('img[alt=\'Like button\']');
      const dislikeButton = container.querySelector('img[alt=\'Dislike button\']');

      fireEvent.click(likeButton);
      fireEvent.click(dislikeButton);

      expect(axios.post).toBeCalledWith(request.like, { id: 1 });
      expect(axios.post).toBeCalledWith(request.dislike, { id: 2 });
      done();
    });
  });

  it('should show loading screen while request does not answer', (done) => {
    axios.get.mockReturnValue(new Promise(() => { }));
    const { getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      getByText('Loading...');
      done();
    });
  });

  it('should show that network has problems if the first request failed', (done) => {
    axios.get.mockReturnValue(Promise.reject(new Error('Network is bad!')));

    const { getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      getByText(/Network problems detected. Please try again latter./);
      done();
    });
  });

  it('should show error when response status is not of the 200 family', (done) => {
    axios.get.mockResolvedValue({ data: '', status: 500 });

    const { getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      getByText(/We're experimenting technical difficulties. Please try again latter./);
      done();
    });
  });

  it('should alert when user has a new match and vanish when clicked or on keyPress', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({
      data: {
        success: true,
        user: {
          age: 75,
          name: 'Paulo Freire',
          image: {
            src: 'paulo.jpg',
          },
        },
      },
      status: 200,
    });
    const { findByText, getByAltText, getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      const likeButton = getByAltText(/Like button/);

      fireEvent.click(likeButton);

      findByText(/It's a match!/).then((node) => {
        getByText(/Paulo Freire/);
        getByText(/75/);
        fireEvent.click(node);
        // After clicking the match screen, it should show the next user
        getByText(/George Bush/);
        done();
      });
    });
  });

  it('should alert when user has a new match and vanish when clicked or on keyPress', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({
      data: {
        success: true,
        user: {
          age: 75,
          name: 'Paulo Freire',
          image: {
            src: 'paulo.jpg',
          },
        },
      },
      status: 200,
    });
    const { findByText, getByText, getByAltText } = render(<MatchWithStore />);

    setImmediate(() => {
      const likeButton = getByAltText(/Like button/);

      fireEvent.click(likeButton);

      findByText(/It's a match!/).then((node) => {
        getByText(/Paulo Freire/);
        getByText(/75/);
        fireEvent.keyDown(node, { key: 'Enter', code: 13 });
        // After click the match screen, it should show the next user
        getByText(/George Bush/);
        done();
      });
    });
  });

  // This test handles what is show by 'Profile' component
  it('should show user name, along with it\'s picture', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { getByAltText, getByText } = render(<MatchWithStore />);
    setImmediate(() => {
      const image = getByAltText(/Ernesto at the beach/);

      getByText(/Ernesto Guevara/);
      getByText(/39/);
      expect(image.src).toMatch(/ernesto\.jpg/);
      done();
    });
  });

  it('should show another user when userIndex changes', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({ data: { success: false }, status: 200 });

    const { getByAltText, getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      const like = getByAltText(/Like button/);
      getByAltText(/Ernesto at the beach/);

      fireEvent.click(like);

      const image = getByAltText(/George grilling some meat/);

      getByText(/George Bush/);
      getByText(/72/);
      expect(image.src).toMatch(/bush\.jpg/);
      done();
    });
  });

   it('should show another user when userIndex changes', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({ data: { success: false }, status: 200 });

    const { getByAltText, getByText } = render(<MatchWithStore />);

    setImmediate(() => {
      const like = getByAltText(/Like button/);
      getByAltText(/Ernesto at the beach/);

      fireEvent.click(like);

      const image = getByAltText(/George grilling some meat/);

      getByText(/George Bush/);
      getByText(/72/);
      expect(image.src).toMatch(/bush\.jpg/);
      done();
    });
  });

  it('should hide description text when the profile changes', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    axios.post.mockResolvedValue({ data: { success: false }, status: 200 });

    const { getByText, getByAltText, queryByText } = render(<MatchWithStore />);

    setImmediate(() => {
      const image = getByAltText(/Ernesto at the beach/);
      const like = getByAltText(/Like button/);

      fireEvent.click(image);
      getByText(/I\'m a warrior/);

      fireEvent.click(like);

      expect(queryByText(/Former US President/)).toBe(null);
      done();
    });
  });
});
