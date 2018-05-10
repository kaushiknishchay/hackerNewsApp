import React from 'react';
import styled from 'styled-components';
import { Linking, Alert } from 'react-native';

import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';


const CommentWrap = styled.View`
  background: #fff;
  padding: 22px;
`;

const CommentText = styled(HTML)`
  font-size: 16px;
`;

const SubTextWrap = styled.View`
  margin-top: 10px;
  justify-content: space-between;
  flex-direction: row;
  align-content: stretch;
  width: 100%;
`;

const SubText = styled.Text`
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: 15px;
  flex: 1;
  align-self: stretch;
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}

`;

const checkAndOpenUrl = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      Alert.alert('URL Error', 'Can\'t open the URL');
    } else {
      return Linking.openURL(url);
    }
    return null;
  }).catch(err =>
    Alert.alert('URL Error', 'Error trying to open url'));
};


const onLinkPress = (event, href) => {
  checkAndOpenUrl(href);
};

const CommentListItem = ({ comment: commentItem }) => {
  const newsTime = new Date(parseInt(`${commentItem.time}000`, 10)).toDateString();

  return (
    <CommentWrap>
      <CommentText
        baseFontStyle={{
          fontSize: 16,
        }}
        html={commentItem.text}
        onLinkPress={onLinkPress}
      />
      <SubTextWrap>
        <SubText fontWeight="bold">
              by { commentItem.by }
        </SubText>
        <SubText align="right">
          { newsTime }
        </SubText>
      </SubTextWrap>
    </CommentWrap>
  );
};

CommentListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comment: PropTypes.object.isRequired,
};

export default CommentListItem;
