import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";
import CameraComponent from "../../components/camera";
import { Camera } from "expo-camera";
import colorPallette from "../../stuff/colorPallette";
import * as Location from "expo-location";

export default class CreateEventScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      eventName: "",
      description: "",
      time: "",
      locPerms: false,
      location: {},
      tracking: NaN,
      intervalInput: "",
      region: {},
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <SafeAreaProvider>
        <AppHeader title={"Report Event"} />
        <CameraComponent />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <ScrollView
            contentContainerStyle={[styles.container, { flex: undefined }]}
            style={{ width: "100%" }}
          >
            <SafeAreaView style={styles.sav} />

            <TextInput
              value={this.state.eventName}
              placeholder="Event name"
              maxLength={16}
              style={styles.optionTextInput}
              onChangeText={(eventName) => {
                this.setState({ eventName });
              }}
              placeholderTextColor={colorPallette.blackCoffee}
            />

            <TextInput
              value={this.state.description}
              placeholder="Description"
              maxLength={70}
              style={styles.optionTextInput}
              onChangeText={(description) => {
                this.setState({ description });
              }}
              placeholderTextColor={colorPallette.blackCoffee}
            />

            <TouchableOpacity
              style={[styles.optionButton, { marginTop: 40 }]}
              onPress={this.createEvent}
            >
              <Text style={styles.optionButtonText}>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  createEvent = async () => {
    this.getLocation();
    if (!this.state.eventName) {
      Alert.alert("Enter something");
    } else {
      var eventInfo = {
        eventName: this.state.eventName,
        description: this.state.description,
        time: this.getCDate(),
        userId: firebase.auth().currentUser.uid,
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        imageUrl: "asd",
        refId: 1,
      };

      var id = firebase
        .database()
        .ref("/events/")
        .push(eventInfo, (a) => {});
      Alert.alert("Event Reported!");
    }
  };

  getCDate = () => {
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds

    return (
      year.toString() +
      "-" +
      month.toString() +
      "-" +
      date.toString() +
      " " +
      hours.toString() +
      ":" +
      min.toString() +
      ":" +
      sec.toString()
    );
  };
  getLocation = async (callback) => {
    var { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      // console.log("no perm");
    } else {
      // console.log("getting location now");
      const loc = await Location.getCurrentPositionAsync();
      // console.log("got location ", loc);
      this.setState({
        locPerms: true,
        location: loc,
      });
      // console.log(loc);
      console.log(this.state.location.coords.latitude);
      if (callback) callback(loc);
    }
  };
}
