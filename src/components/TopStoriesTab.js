import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStoryFetch from '../hoc/withStoryFetch';

function initMapStateToProps(state) {
  const feed = state.get('feed');
  return {
    storiesList: feed.get('topStories'),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchStories: () => dispatch({ type: 'FETCH_TOP_STORIES' }),
  }, dispatch);
}

export default connect(
  initMapStateToProps,
  initMapDispatchToProps,
)(withStoryFetch());
