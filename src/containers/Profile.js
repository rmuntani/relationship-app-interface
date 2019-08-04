import { connect } from 'react-redux';
import { changeCurrentImage, toggleDescription } from '../actions';
import ProfileComponent from '../components/Profile';

const mapStateToProps = (state) => {
  const { profileInteraction } = state;
  const { imageIndex, showDescription } = profileInteraction;

  return {
    imageIndex,
    showDescription,
  };
};

const mapDispatchToProps = dispatch => (
  {
    imageClick: (showDescription, currIndex, numberOfImages) => {
      if (!showDescription) {
        dispatch(toggleDescription());
      } else {
        dispatch(changeCurrentImage(currIndex, numberOfImages));
      }
    },
  }
);

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);

export default Profile;
