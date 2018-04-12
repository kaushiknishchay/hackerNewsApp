import React from 'react';
import { StackNavigator } from 'react-navigation';


import TabLayout from './src/components/TabLayoutNavigator';
import { primaryColor } from './src/constants/colors';


console.ignoredYellowBox = ['Warning:', 'Warning: component'];

const MainStack = StackNavigator({
  Tabs: {
    screen: TabLayout,
  },
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

export default class App extends React.Component {
  render() {
    return (
      <MainStack />
    );
  }
}
