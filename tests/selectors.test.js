import { mapStateToProfileProps } from '../src/selectors';

const state = {
  consultAPI: {},
  profileInteraction: {
    imageIndex: 0,
    showDescription: false,
  },
  match: {},
};

it('should use mapStateToProfileProps successfully', () => {
  const profileProps = {
    imageIndex: 0,
    showDescription: false,
  };

  expect(mapStateToProfileProps(state)).toEqual(profileProps);
});
