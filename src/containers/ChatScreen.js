import { connect } from 'react-redux';
import ChatScreenComponent from '../components/ChatScreen';
import { mapStateToChatScreenProps } from '../selectors';
import { updateMessages } from '../actions';
import { sendMessageToUserWithDispatch } from '../chatClient';

const mapDispatchToProps = dispatch => ({
  receiveMessage: (id, message) => dispatch(
    updateMessages(id, message),
  ),
  sendMessageToUser: (id, message) => dispatch(
    sendMessageToUserWithDispatch(id, message),
  ),
});

export const ChatScreen = connect(
  mapStateToChatScreenProps,
  mapDispatchToProps,
)(ChatScreenComponent);

export default ChatScreen;
