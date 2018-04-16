import React from 'react';
import withStoryFetch from '../hoc/withStoryFetch';
import api from '../service/httpApi';

export default withStoryFetch(api.fetchBestStories);
