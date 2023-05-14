import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import colorPallette from "../../stuff/colorPallette";
import styles from "../../stuff/styles";
import firebase from "firebase";

export default class ViewEventScreen extends React.Component {
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
      images: [
        {
          base64: "29348902849028349028349029304",
          imageUri: ".jpg",
        },
      ],
    };
  }

  render() {
    item = this.props.route.params.event;
    var refNum = this.props.route.params.refNum;
    var imageData = this.props.route.params.imageData;
    var phoneNum = this.props.route.params.phoneNum;
    people = [];

    console.log(item);
    console.log(imageData);
    console.log("refNum", refNum);
    return (
      <SafeAreaProvider>
        <ScrollView
          contentContainerStyle={[{ flex: undefined }]}
          style={{ width: "100%" }}
        >
          <SafeAreaView style={styles.sav} />
          <AppHeader title="View Event" />
          <TouchableOpacity
            style={[styles.subOptionButton, { alignSelf: "center" }]}
            onPress={this.props.navigation.goBack}
          >
            <Text
              style={[
                styles.subOptionButtonText,
                { color: colorPallette.blackCoffee },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.eventItem,
              { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
            ]}
          >
            <View
              style={[styles.eventItemLeftContent, { alignSelf: "center" }]}
            >
              <Text
                style={[
                  styles.eventItemTitle,
                  { fontSize: 30, alignSelf: "center" },
                ]}
              >
                {item.eventName}
              </Text>
              <Text
                style={[styles.eventItemInfo, { alignSelf: "center" }]}
              >{`${item.time}`}</Text>
              <Text
                style={[styles.eventItemInfo, { alignSelf: "center" }]}
              >{`Location(Cords): ${item.latitude.toFixed(
                2
              )},${item.longitude.toFixed(2)}`}</Text>
              <Text
                style={[styles.eventItemInfo, { alignSelf: "center" }]}
              >{`Description: ${item.description}`}</Text>
            </View>
          </View>
          <View
            style={[
              styles.eventItemBottom,
              {
                flexDirection: "column",
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              },
            ]}
          >
            <Text
              style={[
                styles.eventItemInfo,
                {
                  fontWeight: "normal",
                  opacity: 0.8,
                  alignSelf: "center",
                },
              ]}
            >
              {`Phone #: ${phoneNum}`}
            </Text>
            <Text
              style={[
                styles.eventItemInfo,
                {
                  fontWeight: "normal",
                  opacity: 0.4,
                  alignSelf: "center",
                  fontSize: 14,
                },
              ]}
            >
              {`UserID: ${item.userId}`}
            </Text>
          </View>

          <Image
            style={{
              width: "80%",
              height: "80%",
              alignSelf: "center",
              borderRadius: 20,
            }}
            source={{
              uri: imageData.imageUri,
            }}
          />
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
