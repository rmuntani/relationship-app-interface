import axios from 'axios';
import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Match from '../src/Match';
import { request } from '../src/app.config';

jest.mock('axios');

describe('Match', () => {
  afterEach(cleanup);

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
    {
      id: 3,
      images: [{
        src: 'descartes.jpg',
        alt: 'Rene discarding some trash',
      }],
      description: {
        age: 53,
        name: 'Rene Descartes',
        text: 'C\'est moi',
      },
    },
  ];

  const setUpMatchesTests = () => {
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

    const { container, findByText, getByText } = render(<Match />);

    return { container, findByText, getByText };
  };

  it('should receive users data and show it', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { container, getByText } = render(<Match />);

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

    const { container, getByText } = render(<Match />);

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
    const { container } = render(<Match />);

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
    const { getByText } = render(<Match />);

    setImmediate(() => {
      getByText('Loading...');
      done();
    });
  });

  it('should show that network has problems if the first request failed', (done) => {
    axios.get.mockReturnValue(Promise.reject(new Error('Network is bad!')));

    const { getByText } = render(<Match />);

    setImmediate(() => {
      getByText(/Network problems detected. Please try again latter./);
      done();
    });
  });

  it('should show error when response status is not of the 200 family', (done) => {
    axios.get.mockResolvedValue({ data: '', status: 500 });

    const { getByText } = render(<Match />);

    setImmediate(() => {
      getByText(/We're experimenting technical difficulties. Please try again latter./);
      done();
    });
  });

  it('should alert when user has a new match and vanish when clicked or on keyPress', (done) => {
    const { container, findByText, getByText } = setUpMatchesTests();

    setImmediate(() => {
      const likeButton = container.querySelector('img[alt=\'Like button\']');

      fireEvent.click(likeButton);

      findByText(/It's a match!/).then((node) => {
        getByText(/Paulo Freire/);
        getByText(/75/);
        fireEvent.click(node);
        // After click the match screen, it should show the next user
        getByText(/George Bush/);
        done();
      });
    });
  });

  it('should alert when user has a new match and vanish when clicked or on keyPress', (done) => {
    const { container, findByText, getByText } = setUpMatchesTests();

    setImmediate(() => {
      const likeButton = container.querySelector('img[alt=\'Like button\']');

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
});
