import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/Header";
import myApi from "../api/myApi";
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const AddressScreen = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const user = jwtDecode(token);
        setUserId(user.userId);
      } catch (err) {
        console.log("Error fetching user... ", err);
      }
    };
    fetchUser();
  }, []);

  const handleAddAddress = async () => {
    try {
      const address = {
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postalCode,
      };
      console.log(userId);
      const response = await myApi.post("/addresses", { userId, address });
      console.log(response);
      Alert.alert("Success", "Address successfully added!");
    } catch (err) {
      console.log(err);
      Alert.alert("Failed", "Failed to add address!");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerStyle} />
        <View style={styles.container}>
          <Text style={styles.titleStyle}>Add a new Address</Text>
          <TextInput
            placeholderTextColor={"black"}
            placeholder="India"
            style={styles.inputStyle}
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.inputHeader}>
              Full name (First and Last Name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Enter your name"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.inputHeader}>Mobile Number</Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Mobile No"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.inputHeader}>
              Flat, House No, Building, Company
            </Text>
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder=""
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.inputHeader}>
              Area, Street, Sector, Village
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder=""
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.inputHeader}>Landmark</Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Eg near appollo hospital"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.inputHeader}>Pincode</Text>
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Enter your pincode"
            />
          </View>
          <Pressable onPress={handleAddAddress} style={styles.buttonStyle}>
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  headerStyle: {
    height: 50,
    backgroundColor: "#00CED1",
  },
  inputHeader: {
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  inputStyle: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonStyle: {
    backgroundColor: "#FFC72C",
    padding: 19,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
