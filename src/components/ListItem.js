import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';


const ListWrap = styled.View`
  background: #fff;
  padding: 22px;
`;

const ListTitle = styled.Text`
  font-size: 17px;
  width: 95%;
`;

const ListSubTextWrap = styled.View`
  margin-top: 10px;
  justify-content: space-between;
  flex-direction: row;
  align-content: stretch;
  width: 100%;
`;

const ListSubText = styled.Text`
  text-align: ${props => (props.align ? props.align : 'left')};
  font-size: 16px;
  flex: 1;
  align-self: stretch;
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}

`;

const ListItem = ({ story: newsObj, onPress }) => {
  const newsTime = new Date(parseInt(`${newsObj.time}000`, 10)).toDateString();

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <ListWrap>
        <ListTitle>
          { newsObj.title }
        </ListTitle>
        <ListSubTextWrap>
          <ListSubText fontWeight="bold">
              by { newsObj.by }
          </ListSubText>
          <ListSubText align="right">
            { newsTime }
          </ListSubText>
        </ListSubTextWrap>
      </ListWrap>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  story: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ListItem;
