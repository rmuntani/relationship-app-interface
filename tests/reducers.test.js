import { relationship } from '../src/reducers';
import { CHANGE_CURRENT_IMAGE, TOGGLE_DESCRIPTION } from '../src/actions';

describe('profileInteraction', () => {
  it('should toggle if text is shown or not', () => {
    const action = { type: TOGGLE_DESCRIPTION };

    const initialState = {
      profileInteraction: {
        imageIndex: 0,
        showDescription: true,
      },
    };

    const finalState = {
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
      type: CHANGE_CURRENT_IMAGE,
    };

    const initialState = {
      profileInteraction: {
        imageIndex: 0,
        showDescription: true,
      },
    };

    const finalState = {
      profileInteraction: {
        imageIndex: 1,
        showDescription: true,
      },
    };

    expect(relationship(initialState, action)).toEqual(finalState);
  });
});
