import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";
import colorPallette from "../../stuff/colorPallette";
export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      phoneNumber: "",
      isAdmin: "",
    };
  }
  componentDidMount() {
    this.getUserInfo();
  }
  render() {
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <SafeAreaView style={styles.sav} />

          <AppHeader title="Account" />

          <Image
            source={require("../../assets/images/user.png")}
            style={{
              width: 200,
              height: 200,
            }}
          />

          <Text style={styles.subText}>
            {firebase.auth().currentUser.email}
          </Text>
          <Text style={styles.subText}>
            {"Phone Number: " + this.state.phoneNumber}
          </Text>
          <Text style={styles.subText}>{"isAdmin: " + this.state.isAdmin}</Text>
          <Text style={styles.subText}>{"UserId: " + this.state.userId}</Text>

          <View style={styles.optionButtonsContainer}>
            <TouchableOpacity
              style={[styles.optionButton]}
              onPress={this.signOut}
            >
              <Text style={styles.optionButtonText}>Sign Out</Text>
            </TouchableOpacity>
            <Image
              source={require("../../assets/abstractArt/6.png")}
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: "130%",
                left: "-10%",
              }}
            ></Image>
            <Image
              source={require("../../assets/abstractArt/5.png")}
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: "-650%",
                left: "-10%",
                zIndex: -20,
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  signOut = async () => {
    await firebase.auth().signOut();
    this.props.parentNavigation.navigate("StartScreen");
  };

  getUserInfo = async () => {
    var usersInfo = await (
      await firebase
        .database()
        .ref("/userInfo/" + firebase.auth().currentUser.uid)
        .get()
    ).toJSON();
    this.setState({ userId: usersInfo.userId });
    this.setState({ phoneNumber: usersInfo.phoneNumber });
    this.setState({ isAdmin: usersInfo.isAdmin });
  };
}
