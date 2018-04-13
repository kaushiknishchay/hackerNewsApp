/* eslint-disable class-methods-use-this,react/forbid-prop-types */
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Linking, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs';


import { accentColor } from '../constants/colors';
import api from '../service/httpApi';
import CommentListItem from './CommentListItem';


const StoryWrapper = styled.View`
  padding: 20px;
  background: #f5f5f5;
`;

const StoryTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
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
  width: 90%;
`;

const ListHeader = styled.Text`
  padding: 15px;
  font-weight: bold;
  font-size: 16px;
  color: #111;
  background-color: #d5d7da;
`;

const ActivityWarp = styled.View`padding: 20px;`;

class StoryPage extends Component {
  constructor(props) {
    super(props);
    this.checkAndOpenUrl = this.checkAndOpenUrl.bind(this);

    this.state = {
      commentsList: [],
    };

    this.kids$ = new Subject();
  }


  componentDidMount() {
    const { kids } = this.props.item;
    const bufferLimit = kids.length < 21 ? kids.length : 20;
    const bufferedKeys$ = this.kids$.bufferCount(bufferLimit);

    bufferedKeys$.subscribe((data) => {
      this.setState({
        commentsList: data,
      });
    });

    kids.forEach((item, idx) => {
      if (idx < 20) {
        api.fetchItemInfo(item)
          .then(res => res.data)
          .then((apiData) => {
            bufferedKeys$.next(apiData);
          });
      }
    });
  }

  checkAndOpenUrl(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
      return null;
    }).catch(err => console.error('An error occurred', err));
  }

  keyExtractor = (item, index) => item.id.toString();

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
    const { commentsList } = this.state;

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
  };

  render() {
    const { commentsList } = this.state;
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
