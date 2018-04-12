import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styled from 'styled-components';


import api from '../service/httpApi';
import { accentColor } from '../constants/colors';


const ListWrap = styled.View`
  background: #fff;
  padding: 22px;
`;

const ListTitle = styled.Text`
  font-size: 18px;
`;

const ListAuthor = styled.Text`
  margin-top: 5px;
  font-size: 14px;
`;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsObj: null,
    };
  }

  componentDidMount() {
    const { props } = this;

    console.log();

    if (props && props.storyId && this.state.newsObj === null) {
      this.fetchInfo$ = api.fetchStoryInfo$(props.storyId)
        .subscribe((data) => {
          this.setState({
            newsObj: data,
          });
        });
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return this.state.newsObj === null && nextState.newsObj !== null;
  }

  componentWillUnmount() {
    console.log('unmounted', this.props.storyId);
    if (this.fetchInfo$) { this.fetchInfo$.unsubscribe(); }
  }


  render() {
    const { newsObj } = this.state;

    if (newsObj === null) {
      return (<ActivityIndicator
        style={{
          height: 70,
        }}
        size="large"
        color={accentColor}
      />);
    }

    return (
      <ListWrap key={this.props.storyId}>
        <ListTitle>{newsObj.title}</ListTitle>
        <ListAuthor>by {newsObj.by}</ListAuthor>
      </ListWrap>
    );
  }
}

ListItem.propTypes = {};

export default ListItem;
