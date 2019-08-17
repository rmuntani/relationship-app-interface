import {
  changeCurrentImage, toggleDescription,
  failSuggestions, requestSuggestions, updateSuggestions,
  changeCurrentSuggestion,
  closeMatch,
  showMatch,
  chatWithUser,
  failMatchedUsersRequest,
  requestMatchedUsers,
  updateMatchedUsers,
  updateMessages,
} from '../src/actions';

describe('changeCurrentImage', () => {
  const actionWithIndex = index => (
    {
      imageIndex: index,
      type: 'CHANGE_CURRENT_IMAGE',
    }
  );

  it('should increment the index when it is smaller than the number of images', () => {
    expect(changeCurrentImage(0, 10)).toEqual(actionWithIndex(1));
    expect(changeCurrentImage(4, 100)).toEqual(actionWithIndex(5));
    expect(changeCurrentImage(7, 10)).toEqual(actionWithIndex(8));
  });

  it('should change the index to 0 when it is equal to the number of images', () => {
    expect(changeCurrentImage(0, 1)).toEqual(actionWithIndex(0));
    expect(changeCurrentImage(99, 100)).toEqual(actionWithIndex(0));
  });

  it('should return 0 if image size is negative or 0', () => {
    expect(changeCurrentImage(0, 0)).toEqual(actionWithIndex(0));
    expect(changeCurrentImage(0, -1)).toEqual(actionWithIndex(0));
    expect(changeCurrentImage(-1, -10)).toEqual(actionWithIndex(0));
  });
});

describe('toggleDescription', () => {
  it('should return the expected action with a false', () => {
    const expectedAction = {
      showDescription: false,
      type: 'TOGGLE_DESCRIPTION',
    };
    expect(toggleDescription(false)).toEqual(expectedAction);
  });

  it('should return the expected action with a true', () => {
    const expectedAction = {
      showDescription: true,
      type: 'TOGGLE_DESCRIPTION',
    };
    expect(toggleDescription(true)).toEqual(expectedAction);
  });
});

describe('failSuggestions', () => {
  it('should return an action with error', () => {
    const expectedAction = {
      error: 'Network failed',
      type: 'FAIL_SUGGESTIONS',
    };
    expect(failSuggestions('Network failed')).toEqual(expectedAction);
  });
});

describe('requestSuggestions', () => {
  it('should return an action informing that users where requested', () => {
    const expectedAction = {
      type: 'REQUEST_SUGGESTIONS',
    };

    expect(requestSuggestions()).toEqual(expectedAction);
  });
});

describe('updateSuggestions', () => {
  it('should return an action with the obtained data', () => {
    const expectedAction = {
      suggestions: { user: 'yes' },
      type: 'UPDATE_SUGGESTIONS',
    };

    expect(updateSuggestions({ user: 'yes' })).toEqual(expectedAction);
  });
});

describe('changeCurrentSuggestion', () => {
  const actionWithIndex = index => (
    {
      userIndex: index,
      type: 'CHANGE_CURRENT_SUGGESTION',
    }
  );

  it('should increment the index when it is smaller than the number of images', () => {
    expect(changeCurrentSuggestion(0, 10)).toEqual(actionWithIndex(1));
    expect(changeCurrentSuggestion(4, 100)).toEqual(actionWithIndex(5));
    expect(changeCurrentSuggestion(7, 10)).toEqual(actionWithIndex(8));
  });

  it('should change the index to 0 when it is equal to the number of images', () => {
    expect(changeCurrentSuggestion(0, 1)).toEqual(actionWithIndex(0));
    expect(changeCurrentSuggestion(99, 100)).toEqual(actionWithIndex(0));
  });

  it('should return 0 if image size is negative or 0', () => {
    expect(changeCurrentSuggestion(0, 0)).toEqual(actionWithIndex(0));
    expect(changeCurrentSuggestion(0, -1)).toEqual(actionWithIndex(0));
    expect(changeCurrentSuggestion(-1, -10)).toEqual(actionWithIndex(0));
  });
});

describe('closeMatch', () => {
  it('should return an action to close the match screen', () => {
    const expectedAction = {
      type: 'CLOSE_MATCH',
    };

    expect(closeMatch()).toEqual(expectedAction);
  });
});

describe('showMatch', () => {
  it('should return an action with the user that matched', () => {
    const user = { name: 'Me' };
    const expectedAction = {
      user,
      type: 'SHOW_MATCH',
    };

    expect(showMatch(user)).toEqual(expectedAction);
  });
});

describe('chatWithUser', () => {
  it('should return an action with the user id', () => {
    const expectedAction = {
      userIndex: 4,
      type: 'CHAT_WITH_USER',
    };

    expect(chatWithUser(4)).toEqual(expectedAction);
  });
});

describe('failMatchedUsersRequest', () => {
  it('should return an action informing that the request failed ', () => {
    const expectedAction = {
      type: 'FAIL_MATCHED_USERS_REQUEST',
    };

    expect(failMatchedUsersRequest()).toEqual(expectedAction);
  });
});

describe('requestMatchedUsers', () => {
  it('should return that a request is under way', () => {
    const expectedAction = {
      type: 'REQUEST_MATCHED_USERS',
    };

    expect(requestMatchedUsers()).toEqual(expectedAction);
  });
});

describe('updateMatchedUsers', () => {
  it('should return the matched users', () => {
    const expectedAction = {
      matchedUsers: { users: [] },
      type: 'UPDATE_MATCHED_USERS',
    };

    expect(updateMatchedUsers({ users: [] })).toEqual(expectedAction);
  });
});

describe('updateMessages', () => {
  it('should return an action with the new message', () => {
    const expectedAction = {
      id: 2,
      message: 'Hello my friend',
      type: 'UPDATE_MESSAGES',
    };

    expect(updateMessages(2, 'Hello my friend')).toEqual(expectedAction);
  });
});
