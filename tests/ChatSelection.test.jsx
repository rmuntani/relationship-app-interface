import axios from 'axios';
import { cleanup, render, wait } from '@testing-library/react';
import React from 'react';
import ChatSelection from '../src/ChatSelection';

jest.mock('axios');

describe('ChatSelection', () => {
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

  it('should have users listed with their pictures, name and age', (done) => {
    axios.get.mockResolvedValue({ data: usersData, status: 200 });
    const { getByAltText, getByText } = render(<ChatSelection />);

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

  it('should render a default image if original image is not available', () => {
    const lackingImage = [
      {
        id: 1,
        age: 75,
        name: 'Paulo Freire',
        image: {
          alt: 'It\'s me, Paulo',
          src: null,
        },
      },
    ];
    axios.get.mockResolvedValue({ data: lackingImage, status: 200 });
    const { container, getByText } = render(<ChatSelection />);

    wait(container.querySelector('img[src=\'default\']')).then((image) => {
      expect(image.alt).toEqual('It\'s me, Paulo');
      getByText(/Paulo Freire/);
      getByText(/75/);
    });
  });
});
