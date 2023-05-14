import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/appHeader";
import styles from "../stuff/styles";
import firebase from "firebase";

export default class StartScreen extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate("HomeTabs");
    }
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <SafeAreaView style={styles.sav} />

          <AppHeader />

          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 200,
              height: 200,
            }}
          />

          <View style={styles.optionButtonsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                this.props.navigation.navigate("SignInScreen");
              }}
            >
              <Text style={styles.optionButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                this.props.navigation.navigate("RegisterScreen");
              }}
            >
              <Text style={styles.optionButtonText}>Register</Text>
            </TouchableOpacity>
            <Image
              source={require("../assets/abstractArt/1.png")}
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: "150%",
                right: "-5%",
              }}
            ></Image>
            <Image
              source={require("../assets/abstractArt/3.png")}
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: "-250%",
                left: "-20%",
              }}
            ></Image>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}
