import React, { PureComponent } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';


const ListWrap = styled.View`
  background: #fff;
  padding: 22px;
`;

const ListTitle = styled.Text`
  font-size: 18px;
`;

const ListSubtitleWrap = styled.View`
  margin-top: 8px;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

const ListSubtitle = styled.Text`
  text-align: left;
  font-size: 16px;
  flex: 1;
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
`;

class ListItem extends PureComponent {
  render() {
    const { story: newsObj } = this.props;

    const newsTime = new Date(parseInt(`${newsObj.time}000`, 10)).toDateString();

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <ListWrap>
          <ListTitle>
            { newsObj.title }
          </ListTitle>
          <ListSubtitleWrap>
            <ListSubtitle fontWeight="bold">
              by { newsObj.by }
            </ListSubtitle>
            <ListSubtitle>
              { newsTime }
            </ListSubtitle>
          </ListSubtitleWrap>
        </ListWrap>
      </TouchableOpacity>
    );
  }
}

ListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  story: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListItem;
