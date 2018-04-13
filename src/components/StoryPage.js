import React, { Component } from 'react';
import { Text, Linking, TouchableOpacity, FlatList, View } from 'react-native';
import styled from 'styled-components';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { accentColor } from "../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// import PropTypes from 'prop-types';

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
  background: mistyrose;
  padding: 10px;
  margin-bottom: 5px;
`;

const StoryUrl = styled.Text`  
  font-size: 16px;
  color: ${accentColor};
`;

const ListHeader = styled.Text`
  padding: 15px;
  font-weight: bold;
  font-size: 16px;
  color: #111;
  background-color: #d5d7da;
`;

class StoryPage extends Component {

  _checkAndOpenUrl = (url) => {

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
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
            onPress={ () => this._checkAndOpenUrl(url) }
          >
            <StoryUrlWrap>
              <MaterialIcons
                size={ 26 }
                style={ {
                  marginRight: 10,
                } }
                color={ accentColor }
                name="open-in-browser"
              />
              <StoryUrl>{ url }</StoryUrl>
            </StoryUrlWrap>
          </TouchableOpacity>

        </StoryWrapper>

        <FlatList
          ListHeaderComponent={
            <ListHeader>Comments</ListHeader>
          }
        />
      </React.Fragment>
    );
  }
}

// StoryPage.propTypes = {};

export default withMappedNavigationProps()(StoryPage);
