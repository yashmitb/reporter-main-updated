import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/appHeader";
import styles from "../stuff/styles";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
import Constants from "expo-constants";
import { Switch } from "react-native";
export default class RegisterScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      phoneNumber: "",
      errorMessage: "",
      isAdmin: false,
    };
  }
  toggleSwitch = () => {
    if (this.state.isAdmin === false) {
      this.setState({ isAdmin: true });
    } else {
      this.setState({ isAdmin: false });
    }
  };
  render() {
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate("HomeTabs");
    }
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={[styles.container, { flex: undefined }]}
          behavior="height"
          enabled
        >
          <ScrollView
            style={{
              width: "100%",
            }}
            contentContainerStyle={[styles.container, { flex: undefined }]}
          >
            <SafeAreaView style={styles.sav} />

            <AppHeader title="Register" />

            <Image
              source={require("../assets/icon.png")}
              style={{
                width: 200,
                height: 200,
              }}
            />

            <TextInput
              style={styles.optionTextInput}
              placeholder="Email"
              value={this.state.emailInput}
              onChangeText={(emailInput) => {
                this.setState({ emailInput });
              }}
              placeholderTextColor="black"
            />

            <TextInput
              style={styles.optionTextInput}
              placeholder="Password"
              secureTextEntry={true}
              value={this.state.passwordInput}
              onChangeText={(passwordInput) => {
                this.setState({ passwordInput });
              }}
              placeholderTextColor="black"
            />

            <TextInput
              style={styles.optionTextInput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={this.state.confirmPasswordInput}
              onChangeText={(confirmPasswordInput) => {
                this.setState({ confirmPasswordInput });
              }}
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.optionTextInput}
              placeholder="(604) 333-3333"
              value={this.state.phoneNumber}
              onChangeText={(text) => {
                this._onChangeText(text);
              }}
              maxLength={10}
              placeholderTextColor="black"
              keyboardType={Platform.OS ? "numeric" : "number-pad"}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text
                style={[
                  styles.eventItemInfo,
                  { alignSelf: "center", paddingRight: "5%", fontSize: 30 },
                ]}
              >
                Admin?
              </Text>
              <Switch
                trackColor={{ false: "#342e37", true: "#ffe66d" }}
                thumbColor={this.state.isAdmin ? "#342e37" : "#f4f3f4"}
                ios_backgroundColor="#342e37"
                onValueChange={this.toggleSwitch}
                value={this.state.isAdmin}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={this.attemptRegister}
            >
              <Text style={styles.optionButtonText}>Register</Text>
            </TouchableOpacity>

            {(() =>
              this.state.errorMessage != "" ? (
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
              ) : undefined)()}

            <TouchableOpacity
              style={styles.subOptionButton}
              onPress={() => {
                this.props.navigation.navigate("StartScreen");
              }}
            >
              <Text style={styles.subOptionButtonText}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  attemptRegister = async () => {
    if (!(this.state.emailInput && this.state.passwordInput)) {
      this.setState({ errorMessage: "Please enter something" });
      return;
    }

    if (this.state.passwordInput != this.state.confirmPasswordInput) {
      this.setState({ errorMessage: "Passwords do not match" });
      return;
    }
    if (this.state.phoneNumber === null) {
      this.setState({ errorMessage: "no phone # entered" });
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.emailInput,
          this.state.passwordInput
        );
      var userInfo = {
        userId: firebase.auth().currentUser.uid,
        phoneNumber: this.state.phoneNumber,
        isAdmin: this.state.isAdmin,
      };

      var id = firebase
        .database()
        .ref("/userInfo/" + firebase.auth().currentUser.uid)
        .set(userInfo);
      if (response) {
        this.props.navigation.navigate("HomeTabs");
      }
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.code });
    }
  };
  _onChangeText = (text) => {
    let formatedNo = this.formatMobileNumber(text);
    this.setState({ phoneNumber: formatedNo });
  };

  formatMobileNumber = (text) => {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  };
}
