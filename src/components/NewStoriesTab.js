import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import withStoryFetch from '../hoc/withStoryFetch';

function initMapStateToProps(state) {
  return {
    storiesList: state.getIn(['feed', 'newStories']),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchStories: () => dispatch({ type: 'FETCH_NEW_STORIES' }),
  }, dispatch);
}

export default connect(
  initMapStateToProps,
  initMapDispatchToProps,
)(withStoryFetch());
