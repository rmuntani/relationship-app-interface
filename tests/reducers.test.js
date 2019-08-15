import { relationship } from '../src/reducers';

describe('profileInteraction', () => {
  it('should toggle if text is shown or not', () => {
    const action = { showDescription: false, type: 'TOGGLE_DESCRIPTION' };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 0,
        showDescription: true,
      },
      chat: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 0,
        showDescription: false,
      },
      chat: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
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
      chat: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 1,
        showDescription: true,
      },
      chat: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});

describe('consultAPI', () => {
  it('should return a failed request', () => {
    const action = {
      error: 'Network failed',
      type: 'FAIL_SUGGESTIONS',
    };

    const initialState = {
      consultAPI: {
        suggestions: [],
        error: null,
        success: null,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
      chat: {},
    };

    const finalState = {
      consultAPI: {
        suggestions: [],
        error: 'Network failed',
        success: false,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
      chat: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should return the request data', () => {
    const action = {
      suggestions: { user: 'yes' },
      type: 'UPDATE_SUGGESTIONS',
    };

    const initialState = {
      consultAPI: {
        suggestions: [],
        error: null,
        success: null,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
      chat: {},
    };

    const finalState = {
      consultAPI: {
        suggestions: { user: 'yes' },
        error: null,
        success: true,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
      chat: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should inform that request is being made', () => {
    const action = {
      type: 'REQUEST_SUGGESTIONS',
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
      chat: {},
    };

    const finalState = {
      consultAPI: {
        suggestions: [],
        error: null,
        success: null,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
      chat: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should change to the next user', () => {
    const action = {
      type: 'CHANGE_CURRENT_SUGGESTION',
      userIndex: 1,
    };

    const initialState = {
      consultAPI: {
        suggestions: [],
        error: null,
        success: true,
        userIndex: 0,
      },
      match: {},
      profileInteraction: {},
      chat: {},
    };

    const finalState = {
      consultAPI: {
        suggestions: [],
        error: null,
        success: true,
        userIndex: 1,
      },
      match: {},
      profileInteraction: {},
      chat: {},
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
      chat: {},
    };

    const finalState = {
      consultAPI: {},
      match: {
        open: false,
        user: {},
      },
      profileInteraction: {},
      chat: {},
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
      chat: {},
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
      chat: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});

describe('chat', () => {
  it('should change user id only', () => {
    const action = {
      type: 'CHAT_WITH_USER',
      userId: 4,
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }],
        success: true,
        userId: null,
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }],
        success: true,
        userId: 4,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should change indicate that a request failed, without changing userId', () => {
    const action = {
      error: 'A big mistake',
      type: 'FAIL_MATCHED_USERS_REQUEST',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [],
        success: true,
        userId: 3,
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: 'A big mistake',
        matchedUsers: [],
        success: false,
        userId: 3,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should nullify all chat variables but userId when a new request is made', () => {
    const action = {
      type: 'REQUEST_MATCHED_USERS',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }, { user: 2 }],
        success: true,
        userId: 4,
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [],
        success: null,
        userId: 4,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should update matched users', () => {
    const action = {
      matchedUsers: [{ user: 1 }, { user: 2 }],
      type: 'UPDATE_MATCHED_USERS',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [],
        success: null,
        userId: 4,
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }, { user: 2 }],
        success: true,
        userId: 4,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});
