/* eslint-disable class-methods-use-this,react/forbid-prop-types */
import React, { Component } from 'react';
import { ActivityIndicator, Alert, FlatList, Linking, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { accentColor } from '../constants/colors';
import api from '../service/httpApi';
import CommentListItem from '../components/CommentListItem';
import { errorType, ErrorView } from '../helpers/errorFunc';


const StoryWrapper = styled.View`
  padding: 20px;
  background: #f5f5f5;
  flex-direction: column;
`;

const StoryTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  flex-wrap: wrap;
  width: 95%;
`;

const StoryTime = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
`;

const StoryAuthor = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
`;


const StoryUrlWrap = styled.View`
  flex-direction: row;
  align-items: flex-start;
  align-content: center;
  justify-content: flex-start;
  margin-top: 5px;
  padding: 10px 0;
  margin-bottom: 5px;
`;

const StoryUrl = styled.Text`  
  font-size: 16px;
  color: ${accentColor};
  width: 95%;
`;

const ListHeader = styled.Text`
  padding: 15px;
  font-weight: bold;
  font-size: 16px;
  color: #111;
  background-color: #d5d7da;
`;

const ActivityWarp = styled.View`padding: 20px;`;

const NoCommentsText = styled.Text`
  text-align:center;
  font-weight: bold;
  padding: 25px;
  background-color: #f5f5f5;
`;

class StoryPage extends Component {
  static showAlert(title, msg) {
    Alert.alert(title, msg);
  }

  constructor(props) {
    super(props);
    this.checkAndOpenUrl = this.checkAndOpenUrl.bind(this);

    this.state = {
      commentsList: [],
      errorObj: {},
    };
  }

  componentDidMount() {
    const { item: storyItem } = this.props;

    if (storyItem.kids && (typeof storyItem.kids !== 'undefined') && storyItem.kids.length > 0) {
      this.kids$ = new Subject();

      const { kids } = this.props.item;
      const bufferLimit = kids.length < 21 ? kids.length : 20;
      const bufferedKeys$ = this.kids$.bufferCount(bufferLimit);

      bufferedKeys$.subscribe(
        (data) => {
          this.setState((state, props) => ({
            commentsList: data,
          }));
        },
        (error) => {
          this.setState({
            errorObj: errorType('Can\'t get comments for this post.'),
          });
        },
      );

      kids.forEach((item, idx) => {
        if (idx < 20) {
          api.fetchItemInfo(item)
            .then(res => res.data)
            .then((apiData) => {
              bufferedKeys$.next(apiData);
            })
            .catch((e) => {
              bufferedKeys$.unsubscribe();
              this.setState({
                errorObj: errorType('Error fetching comments for this post.'),
              });
            });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.kids$) {
      this.kids$.unsubscribe();
    }
  }

  checkAndOpenUrl(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        StoryPage.showAlert('URL Error', 'Can\'t open the URL');
      } else {
        return Linking.openURL(url);
      }
      return null;
    }).catch(err =>
      StoryPage.showAlert('URL Error', 'Error trying to open url'));
  }

  keyExtractor = (item, index) => item.id.toString();


  _renderErrorView = () => {
    if (this.state.errorObj.type && this.state.errorObj.msg) {
      return (<ErrorView msg={this.state.errorObj.msg} />);
    }
    return null;
  };

  renderListItem = ({ item, index }) => (
    <CommentListItem
      comment={item}
      onPress={() => this.props.navigation.navigate('StoryPage', { item })}
    />);

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );

  renderCommentListView = () => {
    const { item } = this.props;
    const { commentsList } = this.state;

    if (item && item.kids) {
      if (!commentsList || commentsList.length > 0) {
        return (
          <FlatList
            ListHeaderComponent={
              <ListHeader>Comments</ListHeader>
            }
            ItemSeparatorComponent={this.renderSeparator}
            data={commentsList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderListItem}
            initialNumberToRender={10}
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
    }
    return (
      <View>
        <NoCommentsText>No comments on this story yet.</NoCommentsText>
      </View>);
  };


  render() {
    const { item } = this.props;
    const {
      title, by, time, url,
    } = item;
    const sTime = new Date(parseInt(`${time}000`, 10)).toDateString();

    return (
      <React.Fragment>
        <StoryWrapper>
          <StoryTime>
            { sTime }
          </StoryTime>

          <StoryTitle>
            { title }
          </StoryTitle>

          <StoryAuthor>
            { by }
          </StoryAuthor>

          <TouchableOpacity
            onPress={() => this.checkAndOpenUrl(url)}
          >
            <StoryUrlWrap>
              <MaterialIcons
                size={26}
                style={{
                  marginRight: 10,
                }}
                color={accentColor}
                name="open-in-browser"
              />
              <StoryUrl>{ url }</StoryUrl>
            </StoryUrlWrap>
          </TouchableOpacity>
        </StoryWrapper>
        {
          this._renderErrorView()
        }

        {
          this.renderCommentListView()
        }
      </React.Fragment>
    );
  }
}

StoryPage.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};


export default withMappedNavigationProps()(StoryPage);
