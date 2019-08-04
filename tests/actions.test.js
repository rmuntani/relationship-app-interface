import {
  changeCurrentImage, CHANGE_CURRENT_IMAGE, toggleDescription, TOGGLE_DESCRIPTION,
} from '../src/actions';

describe('changeCurrentImage', () => {
  const actionWithIndex = index => (
    {
      imageIndex: index,
      type: CHANGE_CURRENT_IMAGE,
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
  it('should return the expected action', () => {
    const expectedAction = {
      type: TOGGLE_DESCRIPTION,
    };
    expect(toggleDescription()).toEqual(expectedAction);
  });
});

