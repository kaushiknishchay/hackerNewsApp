import { TabNavigator } from 'react-navigation';


import TopStoriesTabScreen from '../components/TopStoriesTab';
import NewStoriesTabScreen from '../components/NewStoriesTab';
import BestStoriesTabScreen from '../components/BestStoriesTab';
import { accentColor } from '../constants/colors';

export default TabNavigator({
  TopStories: {
    screen: TopStoriesTabScreen,
    navigationOptions: {
      tabBarLabel: 'Top',
    },
  },
  NewStories: {
    screen: NewStoriesTabScreen,
    navigationOptions: {
      tabBarLabel: 'New',
    },
  },
  BestStories: {
    screen: BestStoriesTabScreen,
    navigationOptions: {
      tabBarLabel: 'Best',
    },
  },
}, {
  initialRouteName: 'TopStories',
  navigationOptions: ({ navigation }) => ({
  }),
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#d1d1d1',
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    indicatorStyle: {
      backgroundColor: accentColor,
      height: 3,
    },
  },
  lazy: true,
  // tabBarComponent: TabBarBottom,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
});
