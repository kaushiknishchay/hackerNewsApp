import React from 'react';

import api from '../service/httpApi';
import withStoryFetch from '../hoc/withStoryFetch';

export default withStoryFetch(api.fetchTopStories);
