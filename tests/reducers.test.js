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
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 0,
        showDescription: false,
      },
      chat: {},
      messages: {},
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
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {
        imageIndex: 1,
        showDescription: true,
      },
      chat: {},
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
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
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {
        open: false,
        user: {},
      },
      profileInteraction: {},
      chat: {},
      messages: {},
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
      messages: {},
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
      messages: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});

describe('chat', () => {
  it('should change user id only', () => {
    const action = {
      type: 'CHAT_WITH_USER',
      userIndex: 4,
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }],
        success: true,
        userIndex: null,
      },
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }],
        success: true,
        userIndex: 4,
      },
      messages: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should change indicate that a request failed, without changing userIndex', () => {
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
        userIndex: 3,
      },
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: 'A big mistake',
        matchedUsers: [],
        success: false,
        userIndex: 3,
      },
      messages: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should nullify all chat variables but userIndex when a new request is made', () => {
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
        userIndex: 4,
      },
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [],
        success: null,
        userIndex: 4,
      },
      messages: {},
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
        userIndex: 4,
      },
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {
        error: '',
        matchedUsers: [{ user: 1 }, { user: 2 }],
        success: true,
        userIndex: 4,
      },
      messages: {},
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});

describe('messages', () => {
  it('should create a new entry when it doesn\'t exists', () => {
    const action = {
      id: 4,
      message: { id: 4, message: 'Hello there' },
      type: 'UPDATE_MESSAGES',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {},
      messages: {},
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {},
      messages: {
        4: [
          { id: 4, message: 'Hello there' },
        ],
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should insert a message in an existing entry and preserve ordering', () => {
    const action = {
      id: 4,
      message: { id: -1, message: 'What is up?' },
      type: 'UPDATE_MESSAGES',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {},
      messages: {
        4: [
          { id: 4, message: 'Hello there' },
        ],
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {},
      messages: {
        4: [
          { id: 4, message: 'Hello there' },
          { id: -1, message: 'What is up?' },
        ],
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });

  it('should insert a new entry and preserve old entries', () => {
    const action = {
      id: 5,
      message: { id: 5, message: 'Whoobadooba' },
      type: 'UPDATE_MESSAGES',
    };

    const initialState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {},
      messages: {
        4: [
          { id: 4, message: 'Hello there' },
          { id: -1, message: 'What is up?' },
        ],
      },
    };

    const finalState = {
      consultAPI: {},
      match: {},
      profileInteraction: {},
      chat: {},
      messages: {
        4: [
          { id: 4, message: 'Hello there' },
          { id: -1, message: 'What is up?' },
        ],
        5: [
          { id: 5, message: 'Whoobadooba' },
        ],
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});
