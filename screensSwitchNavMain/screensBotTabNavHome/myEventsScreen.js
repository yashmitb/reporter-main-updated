import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";

export default class MyEventsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          eventName: "Meeting",
          description: "asd",
          userId: "asdf",
          time: "2022-11-17 17:2:18",
          location: "Restaurant",
        },
      ],
      phoneNum: "",
      isAdmin: false,
      images: [
        {
          base64: "29348902849028349028349029304",
          imageUri: ".jpg",
        },
      ],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    if (this.state.isAdmin === true) {
      return (
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <SafeAreaView style={styles.sav} />

            <AppHeader title="View Events" />

            <Image
              source={require("../../assets/handcuff.png")}
              style={{
                width: 100,
                height: 100,
                marginBottom: 10,
              }}
            />

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.events}
              style={{
                width: "100%",
                flex: 1,
              }}
              renderItem={this.renderEventItem}
            />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffe66d",
            justifyContent: "center",
          }}
        >
          <Text style={styles.headerText}>
            You are not authorized to view this page.
          </Text>
        </View>
      );
    }
  }

  renderEventItem = ({ item }) => {
    return (
      <View style={styles.eventItem}>
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemTitle}>{item.eventName}</Text>
          <Text style={styles.eventItemInfo}>{item.time}</Text>
        </View>
        <View style={styles.eventItemRightContent}>
          <Text
            style={[
              styles.eventItemInfo,
              {
                fontStyle: "italic",
                fontWeight: "normal",
                marginTop: 20,
                opacity: 0.4,
              },
            ]}
          >
            {`ID: ${item.userId}`}
          </Text>
        </View>
        <View style={styles.eventItemEditButtonContainer}>
          <TouchableOpacity
            style={styles.eventItemEditButton}
            onPress={() => {
              this.props.navigation.navigate("ViewEventScreen", {
                event: item,
                refNum: this.state.events.indexOf(item),
                imageData: this.state.images[this.state.events.indexOf(item)],
                phoneNum: this.state.phoneNum,
              });
            }}
          >
            <Text style={styles.eventItemEditButtonText}>View</Text>
          </TouchableOpacity>
          <Image
            source={require("../../assets/abstractArt/4.png")}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: "300%",
              right: "-50%",
            }}
          ></Image>
          <Image
            source={require("../../assets/abstractArt/1.png")}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: "365%",
              right: "-130%",
            }}
          ></Image>
        </View>
      </View>
    );
  };

  getEvents = async () => {
    var myEvents = [];
    var events = await (
      await firebase.database().ref("/events/").get()
    ).toJSON();
    for (var i in events) {
      var obj = JSON.parse(JSON.stringify(events[i]));
      myEvents.push(events[i]);
    }

    var myImages = [];
    var images = await (
      await firebase.database().ref("/images/").get()
    ).toJSON();
    for (var i in images) {
      var obj = JSON.parse(JSON.stringify(images[i]));
      myImages.push(images[i]);
    }

    var phoneNum = "";
    var usersInfo = await (
      await firebase
        .database()
        .ref("/userInfo/" + firebase.auth().currentUser.uid)
        .get()
    ).toJSON();
    this.setState({ phoneNum: usersInfo.phoneNumber });
    this.setState({ isAdmin: usersInfo.isAdmin });
    this.setState({ events: myEvents });
    this.setState({ images: myImages });
  };
}
