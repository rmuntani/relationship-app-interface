import { connect } from 'react-redux';
import MatchComponent from '../components/Match';
import { mapStateToMatchProps } from '../selectors';
import { closeMatch, toggleDescription } from '../actions';
import { dislikeUser, getRecomendations, likeUser } from '../requests';

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeMatch()),
  dislikeUser: (id, currentUser, numberOfUsers) => dispatch(
    dislikeUser(id, currentUser, numberOfUsers),
  ),
  hideDescription: () => dispatch(toggleDescription(false)),
  likeUser: (id, currentUser, numberOfUsers) => dispatch(
    likeUser(id, currentUser, numberOfUsers),
  ),
  requestSuggestions: () => dispatch(getRecomendations()),
});

export const Match = connect(
  mapStateToMatchProps,
  mapDispatchToProps,
)(MatchComponent);

export default Match;
