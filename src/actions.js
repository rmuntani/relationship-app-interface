/* Action types */

export const CHANGE_CURRENT_IMAGE = 'CHANGE_CURRENT_IMAGE';
export const TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION';

/* Action creator */

export function changeCurrentImage(currIndex, numberOfImages) {
  const newIndex = (numberOfImages > 0) ? (currIndex + 1) % numberOfImages : 0;
  return {
    imageIndex: newIndex,
    type: CHANGE_CURRENT_IMAGE,
  };
}

export function toggleDescription() {
  return {
    type: TOGGLE_DESCRIPTION,
  };
}
