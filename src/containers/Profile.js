import { connect } from 'react-redux';
import { changeCurrentImage, toggleDescription } from '../actions';
import ProfileComponent from '../components/Profile';
import { mapStateToProfileProps } from '../selectors';

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
  mapStateToProfileProps,
  mapDispatchToProps,
)(ProfileComponent);

export default Profile;
