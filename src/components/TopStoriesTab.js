import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styled from 'styled-components';

import api from '../service/httpApi';
import ListItem from "./ListItem";
import { Subject } from "rxjs";
import { accentColor } from "../constants/colors";


const ActivityWarp = styled.View`padding: 20px;`;

class TopStoriesTab extends Component {


  constructor(props) {
    super(props);
    this.state = {
      storiesList: [],
      stories: [],
      currentIndex: 10,
      isLoading: true,
    };

    this._add10StoryInfo$ = new Subject().bufferCount(10);

    this._add10StoryInfo$.subscribe(data => {
      console.log('add storyInfo', data);
      this.setState((s, p) => ({
        stories: s.stories.concat(data),
        isLoading: false,
      }));
    });

  }

  componentDidMount() {

    // fetch all 500 stories ids in one go on mount
    this.fetchStories$ = api.fetchTopStories$.subscribe((data) => {

      // save them in storiesList
      this.setState((state, props) => ({
        storiesList: data,
      }));

      this.get10StoriesInfo(0);

    });
  }


  componentWillUnmount() {
    if (this._add10StoryInfo$) {
      this._add10StoryInfo$.unsubscribe();
    }

    if (this.fetchStories$) {
      this.fetchStories$.unsubscribe();
    }
  }


  get10StoriesInfo = (startIndex) => {

    const { storiesList } = this.state;
    const data = storiesList.slice(startIndex, startIndex + 10);

    this.setState((s, p) => ({
      isLoading: true,
      currentIndex: s.currentIndex + 10
    }));


    for (let i = 0; i < data.length; i++) {

      api.fetchStoryInfo2$(data[i])
        .then(res => res.data)
        .then(data => {
          this._add10StoryInfo$.next(data)
        });
    }

  };

  _addMoreStories = (e) => {

    const { currentIndex, isLoading } = this.state;
    if (isLoading === false) {
      this.get10StoriesInfo(currentIndex);
    }
  };

  _renderListItem = ({ item, index }) => {

    return (<ListItem
      story={ item }
      onPress={ () => this.props.navigation.navigate('StoryPage', {item}) } />);
  };

  _renderSeparator = () => {
    return (
      <View
        style={ {
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        } }
      />
    );
  };

  _renderFooter = () => {
    return this.state.isLoading ?
      <ActivityWarp>
        <ActivityIndicator
          size="large"
          color={ accentColor }
        />
      </ActivityWarp> : null;
  };

  _keyExtractor = (item, index) => item.id.toString();

  _renderListView = () => {
    const { stories } = this.state;

    if (stories && stories.length >= 10) {
      return (
        <FlatList
          style={ {
            flex: 1,
            paddingBottom: 20
          } }
          ItemSeparatorComponent={ this._renderSeparator }
          data={ stories }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderListItem }
          onEndReached={ (e) => this._addMoreStories(e) }
          onEndReachedThreshold={ 0.05 }
          initialNumberToRender={ 10 }
          ListFooterComponent={ this._renderFooter }
        />
      );
    } else {
      return (
        <ActivityWarp>
          <ActivityIndicator
            color={ accentColor }
            size="large"
          />
        </ActivityWarp>);
    }
  };

  count = 1;

  render() {

    const { stories } = this.state;

    console.log('count: ', this.count);
    this.count = this.count + 1;

    return (
      <View
        style={ {
          flex: 1
        } }
      >
        { this._renderListView() }
      </View>
    );
  }
}

TopStoriesTab.propTypes = {};

export default TopStoriesTab;
