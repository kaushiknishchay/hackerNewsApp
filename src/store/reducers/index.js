import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const initialState = fromJS({
  topStories: [],
  newStories: [],
  bestStories: [],
});

const feed = (state = initialState, action) => {
  switch (action.type) {
    case 'TOP_STORIES_DATA':
      return state.merge({ topStories: action.payload });
    case 'NEW_STORIES_DATA':
      return state.set('newStories', action.payload);
    case 'BEST_STORIES_DATA':
      return state.set('bestStories', action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  feed,
});

