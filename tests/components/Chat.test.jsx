import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Chat from '../../src/components/Chat';

jest.mock('axios');

jest.mock('../../src/components/ChatScreen', () => function () {
  return (
    <div>Chat screen</div>
  );
});

jest.mock('../../src/containers/ChatSelection', () => function () {
  return (
    <div>Chat selection</div>
  );
});

describe('Chat', () => {
  afterEach(cleanup);

  it('should render a chat screen if an user was selected', () => {
    const { getByText } = render(<Chat chatWith={4} />);

    getByText(/Chat screen/);
  });

  it('should render a chat selection if an user was not selected', () => {
    const { getByText } = render(<Chat />);

    getByText(/Chat selection/);
  });
});
