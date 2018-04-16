import React from 'react';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import { Provider } from 'react-redux';


import configureStore from './src/store';

import TabLayout from './src/navigation/TabLayoutNavigator';
import { primaryColor } from './src/constants/colors';
import StoryPage from './src/containers/StoryPage';

// @TODO Cleaned up code, create a hoc for teh stories tab
// @TODO Implement Story Details Page with comments showing ad with a header
// @TODO implement redux saga


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
      marginLeft: 10,
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  },
});

const AppContainer = styled.View`
  flex: 1;
`;

const store = configureStore();

const RootApp = () => (
  <Provider store={store}>
    <AppContainer>
      <MainStack />
    </AppContainer>
  </Provider>
);
export default RootApp;
