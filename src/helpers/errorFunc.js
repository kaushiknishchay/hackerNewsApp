import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { errorBackground, errorBorder, errorText } from '../constants/colors';

export const errorType = txt => ({
  type: 'error',
  msg: txt,
});

const ErrorViewWrap = styled.View`
  padding: 40px 20px;
  margin: 10px;
  flex-direction: row;
  background: ${errorBackground};
  border: 1px solid ${errorBorder};
`;

const ErrorText = styled.Text`
  font-size: 16px;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: center;
  font-weight: bold;
  color: ${errorText}
  margin: 0 auto;
`;

export const ErrorView = ({ msg }) => (
  <ErrorViewWrap>
    <ErrorText>{ msg }</ErrorText>
  </ErrorViewWrap>);

ErrorView.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default {
  errorType,
};
