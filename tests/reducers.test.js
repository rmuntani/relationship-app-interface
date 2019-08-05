import { relationship } from '../src/reducers';

describe('profileInteraction', () => {
  it('should toggle if text is shown or not', () => {
    const action = { type: 'TOGGLE_DESCRIPTION' };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 0,
        showDescription: true,
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 0,
        showDescription: false,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
    expect(relationship(finalState, action)).toEqual(initialState);
  });

  it('should change image index when required', () => {
    const action = {
      imageIndex: 1,
      type: 'CHANGE_CURRENT_IMAGE',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 0,
        showDescription: true,
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 1,
        showDescription: true,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});

describe('consultAPI', () => {
  it('should return a failed request', () => {
    const action = {
      error: 'Network failed',
      type: 'FAIL_REQUEST',
    };

    const initialState = {
      consultAPI: {
        data: {},
        error: null,
        success: null,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    const finalState = {
      consultAPI: {
        data: {},
        error: 'Network failed',
        success: false,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should return the request data', () => {
    const action = {
      data: { user: 'yes' },
      type: 'UPDATE_USERS',
    };

    const initialState = {
      consultAPI: {
        data: {},
        error: null,
        success: null,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    const finalState = {
      consultAPI: {
        data: { user: 'yes' },
        error: null,
        success: true,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should inform that request is being made', () => {
    const action = {
      type: 'REQUEST_USERS',
    };

    const initialState = {
      consultAPI: {
        data: { user: 'yes' },
        error: null,
        success: true,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    const finalState = {
      consultAPI: {
        data: {},
        error: null,
        success: null,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should change to the next user', () => {
    const action = {
      type: 'CHANGE_CURRENT_USER',
      userIndex: 1,
    };

    const initialState = {
      consultAPI: {
        data: {},
        error: null,
        success: true,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
    };

    const finalState = {
      consultAPI: {
        data: {},
        error: null,
        success: true,
        userIndex: 1,
      },
      match: {},
      profileInteraction: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});

describe('match', () => {
  it('should set the match to false to close match screen', () => {
    const action = {
      type: 'CLOSE_MATCH',
    };

    const initialState = {
      consultAPI: {},
      match: {
        open: true,
        user: {
          name: 'Me',
        },
      },
      profileInteraction: {},
    };

    const finalState = {
      consultAPI: {},
      match: {
        open: false,
        user: {},
      },
      profileInteraction: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should add user data and set the modal to open', () => {
    const action = {
      type: 'SHOW_MATCH',
      user: {
        name: 'Me',
      },
    };

    const initialState = {
      consultAPI: {},
      match: {
        open: false,
        user: {},
      },
      profileInteraction: {},
    };

    const finalState = {
      consultAPI: {},
      match: {
        open: true,
        user: {
          name: 'Me',
        },
      },
      profileInteraction: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});
