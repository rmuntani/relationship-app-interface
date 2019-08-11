export const mapStateToProfileProps = (state) => {
  const { profileInteraction, consultAPI } = state;
  const { imageIndex, showDescription } = profileInteraction;
  const { data, userIndex } = consultAPI;
  const { description, images } = data[userIndex];

  return {
    description,
    images,
    imageIndex,
    showDescription,
  };
};

export const mapStateToMatchProps = (state) => {
  const { consultAPI, match } = state;
  const {
    error, success, data, userIndex,
  } = consultAPI;
  const { open, user } = match;

  return {
    error,
    matchUser: user,
    openMatch: open,
    success,
    users: data,
    userIndex,
  };
};
