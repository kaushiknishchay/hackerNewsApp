import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import withStoryFetch from '../hoc/withStoryFetch';
import api from '../service/httpApi';


function initMapStateToProps(state) {
  return {
    storiesList: state.getIn(['feed', 'bestStories']),
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchStories: () => dispatch({ type: 'FETCH_BEST_STORIES' }),
  }, dispatch);
}

export default connect(
  initMapStateToProps,
  initMapDispatchToProps,
)(withStoryFetch(api.fetchBestStories));
