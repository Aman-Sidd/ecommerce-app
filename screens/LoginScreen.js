import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import myApi from "../api/myApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    validate();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await myApi.post("/login", { email, password });
      console.log("Token: ", response.data.token);
      await AsyncStorage.setItem("authToken", response.data.token);
      navigation.replace("Main");
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      {loading === true ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="large"
        />
      ) : (
        <>
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{
                uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
              }}
            />
          </View>
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                }}
              >
                Login to your Account
              </Text>
            </View>
            <View
              style={{
                marginTop: 70,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#D0D0D0",
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="email"
                  size={24}
                  color="black"
                />
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{ color: "gray", marginVertical: 10, width: 300 }}
                  placeholder="Enter your email"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#D0D0D0",
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <AntDesign
                  style={{ marginLeft: 8 }}
                  name="lock"
                  size={24}
                  color="black"
                />
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry
                  autoCorrect={false}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={{ color: "gray", marginVertical: 10, width: 300 }}
                  placeholder="Enter your password"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>Keep me logged in</Text>
              <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                Forgot Password
              </Text>
            </View>
            <View style={{ marginTop: 80 }} />
            <Pressable
              style={{
                width: 200,
                backgroundColor: "#FEBE10",
                alignItems: "center",
                borderRadius: 6,
                padding: 15,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onPress={handleLogin}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              style={{ marginTop: 15 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 16 }}
              >
                Don't have an account? Sign Up.
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
