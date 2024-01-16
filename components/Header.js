import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: "#00CED1",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 3,
          height: 38,
          flex: 1,
        }}
      >
        <AntDesign
          style={{ paddingLeft: 10 }}
          name="search1"
          size={24}
          color="black"
        />
        <TextInput placeholder="Search Amazon.in" />
      </Pressable>
      <Feather name="mic" size={24} color="black" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
