import { connect } from 'react-redux';
import ChatSelectionComponent from '../components/ChatSelection';
import { mapStateToChatSelectionProps } from '../selectors';
import { chatWithUser } from '../actions';
import { getMatchedUsers } from '../requests';

const mapDispatchToProps = dispatch => ({
  requestMatchedUsers: () => dispatch(getMatchedUsers()),
  selectUser: userIndex => dispatch(chatWithUser(userIndex)),
});

export const ChatSelection = connect(
  mapStateToChatSelectionProps,
  mapDispatchToProps,
)(ChatSelectionComponent);

export default ChatSelection;
