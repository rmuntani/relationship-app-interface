export const mapStateToProfileProps = (state) => {
  const { profileInteraction, consultAPI } = state;
  const { imageIndex, showDescription } = profileInteraction;
  const { suggestions, userIndex } = consultAPI;
  const { description, images } = suggestions[userIndex];

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
    error, success, suggestions, userIndex,
  } = consultAPI;
  const { open, user } = match;

  return {
    error,
    matchUser: user,
    openMatch: open,
    success,
    users: suggestions,
    userIndex,
  };
};

export const mapStateToChatSelectionProps = (state) => {
  const { chat } = state;
  const { error, success, matchedUsers } = chat;

  return {
    error,
    success,
    users: matchedUsers,
  };
};

export const mapStateToChatProps = (state) => {
  const { chat } = state;
  const { userIndex } = chat;

  return {
    chatWith: userIndex,
  };
};

export const mapStateToChatScreenProps = (state) => {
  const { chat, messages } = state;
  const { matchedUsers, userIndex } = chat;
  const currentUser = matchedUsers.filter(user => user.id === userIndex)[0];

  return {
    messages: messages[userIndex],
    user: currentUser,
  };
};
