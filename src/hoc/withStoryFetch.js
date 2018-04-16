/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import styled from 'styled-components';
import { Subject } from 'rxjs';
import PropTypes from 'prop-types';


import { accentColor } from '../constants/colors';
import api from '../service/httpApi';
import ListItem from '../components/ListItem';
import { errorType, ErrorView } from '../helpers/errorFunc';

export default function withStoryFetch(storyApiFetcher) {
  const ActivityWarp = styled.View`padding: 20px;`;

  return class extends React.Component {
    static propTypes = {
      navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        storiesList: [],
        stories: [],
        currentIndex: 10,
        isLoading: true,
        errorObj: {},
      };

      this.add10StoryInfo$ = new Subject().bufferCount(10);

      this.add10StoryInfo$.subscribe((data) => {
        this.setState((s, p) => ({
          stories: s.stories.concat(data),
          isLoading: false,
        }));
      });
    }

    componentDidMount() {
      if (this.state.stories.length === 0) {
        // fetch all 500 stories ids in one go on mount
        storyApiFetcher
          .then(res => res.data)
          .then((data) => {
            // save them in storiesList
            this.setState((state, props) => ({
              storiesList: data,
            }));

            this.get10StoriesInfo(0);
          })
          .catch((err) => {
            this.setState({
              errorObj: errorType('Failed to fetch info from server'),
            });
          });
      }
    }


    get10StoriesInfo = (startIndex) => {
      if (this.state !== undefined && this.state.storiesList !== undefined) {
        const { storiesList } = this.state;
        const storyData = storiesList.slice(startIndex, startIndex + 10);

        this.setState((s, p) => ({
          isLoading: true,
          currentIndex: s.currentIndex + 10,
        }));

        storyData.forEach((story, indx) => {
          api.fetchItemInfo(story)
            .then(res => res.data)
            .then((apiData) => {
              this.add10StoryInfo$.next(apiData);
            });
        });
      }
    };

    _addMoreStories = () => {
      const { currentIndex, isLoading } = this.state;
      if (isLoading === false) {
        this.get10StoriesInfo(currentIndex);
      }
    };

    _renderListItem = ({ item, index }) => (
      <ListItem
        story={item}
        onPress={() => this.props.navigation.navigate('StoryPage', { item })}
      />);

    _renderSeparator = () => (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );

    _renderFooter = () => (this.state.isLoading ?
      <ActivityWarp>
        <ActivityIndicator
          size="large"
          color={accentColor}
        />
      </ActivityWarp> : null);

    _keyExtractor = (item, index) => item.id.toString();

    _renderErrorView = () => {
      if (this.state.errorObj.type && this.state.errorObj.msg) {
        return (<ErrorView msg={this.state.errorObj.msg} />);
      }

      return null;
    };

    _renderListView = () => {
      const { stories } = this.state;

      if (stories && stories.length > 0) {
        return (
          <FlatList
            style={{
              flex: 1,
              paddingBottom: 20,
            }}
            ItemSeparatorComponent={this._renderSeparator}
            data={stories}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderListItem}
            onEndReached={e => this._addMoreStories(e)}
            onEndReachedThreshold={0.05}
            initialNumberToRender={10}
            ListFooterComponent={this._renderFooter}
          />
        );
      }
      return (
        <ActivityWarp>
          <ActivityIndicator
            color={accentColor}
            size="large"
          />
        </ActivityWarp>);
    };

    render() {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          { this._renderErrorView() }

          { this._renderListView() }
        </View>
      );
    }
  };
}
