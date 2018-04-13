import React, { PureComponent } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';


const CommentWrap = styled.View`
  background: #fff;
  padding: 22px;
`;

const CommentText = styled.Text`
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

class CommentListItem extends PureComponent {
  render() {
    const { comment: commentItem } = this.props;

    const newsTime = new Date(parseInt(`${commentItem.time}000`, 10)).toDateString();

    return (
      <CommentWrap>
        <CommentText>
          { commentItem.text }
        </CommentText>
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
  }
}

CommentListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comment: PropTypes.object.isRequired,
};

export default CommentListItem;
