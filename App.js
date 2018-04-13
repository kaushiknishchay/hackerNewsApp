import React from 'react';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import { Provider } from 'react-redux';


import configureStore from './src/store';

import TabLayout from './src/components/TabLayoutNavigator';
import { primaryColor } from './src/constants/colors';
import StoryPage from './src/components/StoryPage';


console.ignoredYellowBox = ['Warning:', 'Warning: component'];

const MainStack = StackNavigator({
  Tabs: {
    screen: TabLayout,
  },
  StoryPage: {
    screen: StoryPage,
  }

  ,
}, {
  initialRouteName: 'Tabs',
  navigationOptions: {
    title: 'HackerNews App',
    headerStyle: {
      backgroundColor: primaryColor,
    },
    headerTitleStyle: {
      marginLeft: 30,
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  },
});

const AppContainer = styled.View`
  flex: 1;
`;

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <MainStack />
        </AppContainer>
      </Provider>
    );
  }
}
