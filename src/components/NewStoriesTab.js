import React, { Component } from 'react';
import { Text } from 'react-native';

class NewStoriesTab extends Component {
  render() {
    return (
      <Text>
        New Stories{Math.random()}
      </Text>
    );
  }
}

NewStoriesTab.propTypes = {};

export default NewStoriesTab;
