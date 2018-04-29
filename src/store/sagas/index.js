import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import api from '../../service/httpApi';


/* ////////////////////////////////////////////////
                    TOP STORIES
////////////////////////////////////////////////// */

function* sTopStories() {
  const response = yield call(api.fetchTopStories);

  yield put({
    type: 'TOP_STORIES_DATA',
    payload: fromJS(response.data),
  });
}

function* watchTopStoriesFetch() {
  yield takeEvery('FETCH_TOP_STORIES', sTopStories);
}


/* ////////////////////////////////////////////////
                    NEW STORIES
////////////////////////////////////////////////// */


function* sNewStories() {
  const response = yield call(api.fetchNewStories);

  yield put({
    type: 'NEW_STORIES_DATA',
    payload: fromJS(response.data),
  });
}

function* watchNewStoriesFetch() {
  yield takeEvery('FETCH_NEW_STORIES', sNewStories);
}


/* ////////////////////////////////////////////////
                    BEST STORIES
////////////////////////////////////////////////// */


function* sBestStories() {
  const response = yield call(api.fetchBestStories);

  yield put({
    type: 'BEST_STORIES_DATA',
    payload: fromJS(response.data),
  });
}

function* watchBestStoriesFetch() {
  yield takeEvery('FETCH_BEST_STORIES', sBestStories);
}


export default function* rootSaga() {
  yield all([
    watchTopStoriesFetch(),
    watchNewStoriesFetch(),
    watchBestStoriesFetch(),
  ]);
}
