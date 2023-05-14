import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AccountScreen from "../screensSwitchNavMain/screensBotTabNavHome/accountScreen";
import CreateEventScreen from "../screensSwitchNavMain/screensBotTabNavHome/createEventScreen";
import MyEventsScreen from "../screensSwitchNavMain/screensBotTabNavHome/myEventsScreen";
import MyEventsStack from "./myEventsStack";
var BotTabNav = createBottomTabNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import colorPallette from "../stuff/colorPallette";
var AccScreen;

import firebase from "firebase";
export default class HomeTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }
  componentDidMount() {
    AccScreen = <AccountScreen parentNavigation={this.props.navigation} />;
    this.getUserData();
  }
  getUserData = async () => {
    var usersInfo = await (
      await firebase
        .database()
        .ref("/userInfo/" + firebase.auth().currentUser.uid)
        .get()
    ).toJSON();
    this.setState({ isAdmin: usersInfo.isAdmin });
  };
  render() {
    return (
      <BotTabNav.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Create Report") {
              iconName = focused ? "add-circle" : "add-outline";
            } else if (route.name === "Reports") {
              if (this.state.isAdmin === true) {
                iconName = focused
                  ? "file-tray-full"
                  : "file-tray-full-outline";
              } else {
                iconName = focused ? "lock-closed-outline" : "key-outline";
              }
            } else if (route.name === "Account") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colorPallette.redPigment,
          tabBarInactiveTintColor: colorPallette.rhythm,
          headerShown: false,
          headerShadowVisible: false,
        })}
      >
        <BotTabNav.Screen name="Create Report" component={CreateEventScreen} />
        <BotTabNav.Screen name="Reports" component={MyEventsStack} />
        <BotTabNav.Screen name="Account" component={() => AccScreen} />
      </BotTabNav.Navigator>
    );
  }
}
