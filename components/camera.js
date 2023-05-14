import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import firebase from "firebase";

// export const imgUri = uri;

export default function App(props) {
  const [uri, setUri] = useState(null);
  const [base64, setBase64] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  _uploadImageData = async () => {
    if (!uri) {
      Alert.alert("No image");
    } else {
      var imageInfo = {
        imageUri: uri,
        imageBase64: base64.base64,
      };

      var id = firebase
        .database()
        .ref("/images/")
        .push(imageInfo, (a) => {});
      Alert.alert("Image Reported!");
    }
  };
  _takePhoto = async () => {
    const options = { quality: 0.5, base64: true, doNotSave: true };
    const photo = await ref.current.takePictureAsync(options);
    const photoUri = await ref.current.takePictureAsync();
    // console.debug(photo);
    console.debug(photoUri.uri);
    setUri(photoUri.uri);
    setBase64(photo);
    _uploadImageData();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (uri === null) {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={ref}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: "absolute",
                top: "80%",
                left: "45%",
                backgroundColor: "white",
                borderRadius: 25,
              }}
              onPress={_takePhoto}
            >
              <View style={{ width: 50, height: 50, borderRadius: 25 }}></View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: uri,
        }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
