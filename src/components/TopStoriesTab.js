import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';


import api from '../service/httpApi';
import { Subject } from "rxjs";
import ListItem from "./ListItem";


class TopStoriesTab extends Component {


  constructor(props) {
    super(props);
    this.state = {
      storiesList: [],
      stories: [],
      currentIndex: 10
    };

    this.getStoryInfo$ = new Subject();

  }


  componentDidMount() {

    // fetch all 500 stories ids in one go on mount
    this.fetchStories$ = api.fetchTopStories$.subscribe((data) => {
      // console.log(data, data.length);

      // save them in storiesList
      this.setState((state, props) => ({
        storiesList: data,
        stories: data.slice(0,10),
      }));

    });
  }


  componentWillUnmount() {
    if(this.fetchStories$){
      this.fetchStories$.unsubscribe();
    }
  }

  _addMoreStories = (e) => {

  console.log(e);

    // this.setState((state, props)=>{
    //
    //   const {storiesList, currentIndex, stories} = this.state;
    //
    //   return {
    //     stories: stories.concat(storiesList.slice(currentIndex, currentIndex+10)),
    //     currentIndex: currentIndex + 10,
    //   }
    // })
  };

  _renderListItem = ({item})=>{
    return (<ListItem key={item} storyId={item}/>)
  };

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  _keyExtractor = (item, index) => item;


  render() {

    return (
      <View>
        <FlatList
          bounces={false}
          ItemSeparatorComponent={this._renderSeparator}
          data={this.state.stories}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderListItem}
          onStartReached={()=>console.log('start')}
          onEndReached={this._addMoreStories}
        />
      </View>
    );
  }
}

TopStoriesTab.propTypes = {};

export default TopStoriesTab;
