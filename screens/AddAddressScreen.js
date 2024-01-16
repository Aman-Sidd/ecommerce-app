import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";

const AddAddressScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.container}>
        <Text style={styles.headerText}>Your Addresses</Text>
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            navigation.navigate("Add");
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  pressableStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
});
