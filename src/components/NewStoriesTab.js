import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { Observable } from 'rxjs';

class NewStoriesTab extends PureComponent {
  componentDidMount() {
    const obs = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).bufferCount(3);
    obs.subscribe(d => console.log(d));
  }


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
