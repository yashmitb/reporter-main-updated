import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SwitchNavMain from "./navigation/switchNavMain";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import { LogBox } from "react-native";
import * as React from "react";
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <SwitchNavMain />
    </NavigationContainer>
  );
}

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);
