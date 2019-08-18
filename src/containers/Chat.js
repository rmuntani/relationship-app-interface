import { connect } from 'react-redux';
import ChatComponent from '../components/Chat';
import { mapStateToChatProps } from '../selectors';

export const Profile = connect(
  mapStateToChatProps,
  null,
)(ChatComponent);

export default Profile;
