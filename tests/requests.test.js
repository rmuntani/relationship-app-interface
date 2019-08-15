import axios from 'axios';
import {
  getRecomendations, likeUser, dislikeUser, getMatchedUsers,
} from '../src/requests';

jest.mock('axios');

describe('getRecommendation', () => {
  it('should return a function that receives REQUEST_SUGGESTIONS action', () => {
    axios.get.mockReturnValue(new Promise(() => { }));

    const action = { type: 'REQUEST_SUGGESTIONS' };
    const dispatch = jest.fn();
    const returnedDispatches = getRecomendations();

    returnedDispatches(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should return an action with the api\'s data', (done) => {
    axios.get.mockResolvedValue({ data: { user: 'yes' }, status: 200 });
    const action = { suggestions: { user: 'yes' }, type: 'UPDATE_SUGGESTIONS' };
    const dispatch = jest.fn();
    const returnedDispatches = getRecomendations();

    returnedDispatches(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });

  it('should return an action with server error', (done) => {
    axios.get.mockResolvedValue({ data: {}, status: 500 });
    const action = {
      error: 'We\'re experimenting technical difficulties. Please try again latter.',
      type: 'FAIL_SUGGESTIONS',
    };
    const dispatch = jest.fn();
    const returnedDispatches = getRecomendations();

    returnedDispatches(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });

  it('should retur an action with network error', (done) => {
    axios.get.mockReturnValue(Promise.reject(new Error('Network is bad!')));
    const action = {
      error: 'Network problems detected. Please try again latter.',
      type: 'FAIL_SUGGESTIONS',
    };
    const dispatch = jest.fn();
    const returnedDispatches = getRecomendations();

    returnedDispatches(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });
});

describe('postUser', () => {
  const expectToCallChangeUser = (postFunction) => {
    axios.post.mockResolvedValue({
      data: {},
      status: 200,
    });

    const expectedAction = {
      type: 'CHANGE_CURRENT_SUGGESTION',
      userIndex: 2,
    };
    const asyncDispatcher = postFunction(1, 1, 5);
    const dispatch = jest.fn();

    asyncDispatcher(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  };

  const expectToShowMatch = (done, postFunction) => {
    const user = {
      name: 'Me',
    };
    const expectedAction = {
      type: 'SHOW_MATCH',
      user,
    };
    const asyncDispatcher = postFunction(1, 1, 5);
    const dispatch = jest.fn();

    axios.post.mockResolvedValue({
      data: {
        success: true,
        user,
      },
      status: 200,
    });

    asyncDispatcher(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
      done();
    });
  };

  const expectNotToShowMatch = (done, postFunction) => {
    const asyncDispatcher = postFunction(1, 1, 5);
    const dispatch = jest.fn();
    const expectedAction = {
      type: 'CHANGE_CURRENT_SUGGESTION',
      userIndex: 2,
    };

    axios.post.mockResolvedValue({
      data: {
        success: false,
      },
      status: 200,
    });

    asyncDispatcher(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
      done();
    });
  };

  it('should dispatch the change user action for likeUser', () => {
    expectToCallChangeUser(dislikeUser);
    expectToCallChangeUser(likeUser);
  });

  it('should dispatch show match for dislike user', (done) => {
    expectToShowMatch(done, dislikeUser);
  });

  it('should dispatch show match for like user', (done) => {
    expectToShowMatch(done, likeUser);
  });

  it('should dispatch only once when there is no new match for dislikeUser', (done) => {
    expectNotToShowMatch(done, dislikeUser);
  });

  it('should dispatch only once when there is no new match for likeUser', (done) => {
    expectNotToShowMatch(done, likeUser);
  });
});

describe('getMatchedUsers', () => {
  it('should return a function that calls REQUEST_MATCHED_USERS', () => {
    const dispatch = jest.fn();
    const returnedDispatches = getMatchedUsers();
    const action = {
      type: 'REQUEST_MATCHED_USERS',
    };

    returnedDispatches(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should return an action with the API\'s data', (done) => {
    axios.get.mockResolvedValue({ data: { user: 'yes' }, status: 200 });
    const dispatch = jest.fn();
    const returnedDispatches = getMatchedUsers();
    const action = {
      matchedUsers: { user: 'yes' },
      type: 'UPDATE_MATCHED_USERS',
    };

    returnedDispatches(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });

  it('should return an action with an internal error', (done) => {
    axios.get.mockResolvedValue({ data: { user: 'yes' }, status: 500 });
    const dispatch = jest.fn();
    const returnedDispatches = getMatchedUsers();
    const action = {
      error: 'We\'re experimenting technical difficulties. Please try again latter.',
      type: 'FAIL_MATCHED_USERS_REQUEST',
    };

    returnedDispatches(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });

  it('should return an action with a network error', (done) => {
    axios.get.mockReturnValue(Promise.reject(new Error('Network is bad!')));
    const dispatch = jest.fn();
    const returnedDispatches = getMatchedUsers();
    const action = {
      error: 'Network problems detected. Please try again latter.',
      type: 'FAIL_MATCHED_USERS_REQUEST',
    };

    returnedDispatches(dispatch);

    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });
});
