import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <Button
        title="Sign out"
        onPress={async () => {
          await AsyncStorage.removeItem("authToken");
          navigation.replace("Login");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
