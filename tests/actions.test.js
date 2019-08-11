import {
  changeCurrentImage, toggleDescription,
  failRequest, requestUsers, updateUsers,
  changeCurrentUser,
  closeMatch,
  showMatch,
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

describe('failRequest', () => {
  it('should return an action with error', () => {
    const expectedAction = {
      error: 'Network failed',
      type: 'FAIL_REQUEST',
    };
    expect(failRequest('Network failed')).toEqual(expectedAction);
  });
});

describe('requestUsers', () => {
  it('should return an action informing that users where requested', () => {
    const expectedAction = {
      type: 'REQUEST_USERS',
    };

    expect(requestUsers()).toEqual(expectedAction);
  });
});

describe('updateUsers', () => {
  it('should return an action with the obtained data', () => {
    const expectedAction = {
      data: { user: 'yes' },
      type: 'UPDATE_USERS',
    };

    expect(updateUsers({ user: 'yes' })).toEqual(expectedAction);
  });
});

describe('changeCurrentUser', () => {
  const actionWithIndex = index => (
    {
      userIndex: index,
      type: 'CHANGE_CURRENT_USER',
    }
  );

  it('should increment the index when it is smaller than the number of images', () => {
    expect(changeCurrentUser(0, 10)).toEqual(actionWithIndex(1));
    expect(changeCurrentUser(4, 100)).toEqual(actionWithIndex(5));
    expect(changeCurrentUser(7, 10)).toEqual(actionWithIndex(8));
  });

  it('should change the index to 0 when it is equal to the number of images', () => {
    expect(changeCurrentUser(0, 1)).toEqual(actionWithIndex(0));
    expect(changeCurrentUser(99, 100)).toEqual(actionWithIndex(0));
  });

  it('should return 0 if image size is negative or 0', () => {
    expect(changeCurrentUser(0, 0)).toEqual(actionWithIndex(0));
    expect(changeCurrentUser(0, -1)).toEqual(actionWithIndex(0));
    expect(changeCurrentUser(-1, -10)).toEqual(actionWithIndex(0));
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
