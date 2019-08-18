import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Message from '../../src/components/Message';

describe('Message', () => {
  afterEach(cleanup);

  it('should render other user messages', () => {
    const messages = [
      { id: 4, message: 'Hi' },
    ];
    const { getByText } = render(<Message messages={messages} />);

    getByText(/Hi/);
  });

  it('should render other user and current user messages differently', () => {
    const messages = [
      { id: 4, message: 'Hi' },
      { id: 0, message: 'What?' },
    ];
    const { getByText } = render(<Message messages={messages} />);
    const otherUserStyle = getByText(/Hi/).style;
    const currentUserStyle = getByText(/What\?/).style;

    expect(otherUserStyle).not.toEqual(currentUserStyle);
  });
});
