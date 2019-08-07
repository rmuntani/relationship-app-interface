export const mapStateToProfileProps = (state) => {
  const { profileInteraction } = state;
  const { imageIndex, showDescription } = profileInteraction;

  return {
    imageIndex,
    showDescription,
  };
};
