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
        name: 'Rene Descartes',
        text: 'C\'est moi',
      },
    },
  ];

  it('should receive users data and show it', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { container, getByText } = render(<Match />);

    setImmediate(() => {
      const image = container.querySelector('img[src=\'ernesto.jpg\']');
      expect(image.alt).toEqual('Ernesto at the beach');
      getByText('Ernesto Guevara');
      getByText('I\'m a warrior');
      done();
    });
  });

  it('should change users and make requests according to pressed buttons', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { container, getByText } = render(<Match />);

    setImmediate(() => {
      // First user
      const likeButton = container.querySelector('img[alt=\'Like button\']');
      const ernestoImage = container.querySelector('img[src=\'ernesto.jpg\']');
      expect(ernestoImage.alt).toEqual('Ernesto at the beach');
      getByText('Ernesto Guevara');
      getByText('I\'m a warrior');

      fireEvent.click(likeButton);

      // Second user
      const bushImage = container.querySelector('img[src=\'bush.jpg\']');
      expect(bushImage.alt).toEqual('George grilling some meat');
      getByText('George Bush');
      getByText('Former US President');
      done();
    });
  });

  it('should send a request to the right url depending on what button was clicked', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { container } = render(<Match />);
    axios.post = jest.fn();

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

  it('should show load screen when request fails', (done) => {
    axios.get.mockResolvedValue({ status: 500 });
    const { getByText } = render(<Match />);

    setImmediate(() => {
      getByText('Loading...');
      done();
    });
  });

});