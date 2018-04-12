import React, { Component } from 'react';
import { Text } from 'react-native';
import api from '../service/httpApi';


class TopStoriesTab extends Component {
  componentDidMount() {
    api.fetchTopStories().then((res) => {
      console.log(res.data, res.data.length);
    });
  }

  render() {
    return (
      <Text>
        Top Stories
        {Math.random()}
      </Text>
    );
  }
}

TopStoriesTab.propTypes = {};

export default TopStoriesTab;
