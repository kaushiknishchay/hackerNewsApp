import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { Observable } from 'rxjs';
import withStoryFetch from '../hoc/withStoryFetch';
import api from '../service/httpApi';

export default withStoryFetch(api.fetchNewStories);
