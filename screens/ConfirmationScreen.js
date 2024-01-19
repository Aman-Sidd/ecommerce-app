import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import myApi from "../api/myApi";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const [addresses, setAddresses] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    fetchAddress();
  }, []);
  const fetchAddress = async () => {
    try {
      const response = await myApi.get(`/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses.reverse());
    } catch (err) {
      console.log("Something went wrong while fetching addresses...", err);
    }
  };

  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            {steps?.map((step, index) => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "green" },
                      index <= currentStep && { backgroundColor: "green" },
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index < currentStep && { backgroundColor: "green" },
                  ]}
                >
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {" "}
                      &#10003;{" "}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                  {step.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {currentStep == 0 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Select Delivery Address
            </Text>

            <Pressable>
              {addresses.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedAddress(item)}
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 17,
                    marginVertical: 7,
                    borderRadius: 6,
                  }}
                >
                  {selectedAddress && selectedAddress._id === item._id ? (
                    <FontAwesome
                      name="dot-circle-o"
                      size={24}
                      color="#008397"
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedAddress(item)}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}
                  <View style={{ marginLeft: 6 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {item?.name}
                      </Text>
                      <Entypo name="location-pin" size={20} color="red" />
                    </View>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      {item?.houseNo}, {item?.landmark}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      {item?.street}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      India, Chandigarh
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      Phone No: {item?.mobileNo}
                    </Text>
                    <Text style={{ fontSize: 15, color: "#181818" }}>
                      pin code: {item?.postalCode}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItem: "center",
                        gap: 10,
                        marginTop: 7,
                      }}
                    >
                      <Pressable
                        style={{
                          backgroundColor: "#F5F5F5",
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          borderWidth: 0.9,
                          borderColor: "#D0D0D0",
                        }}
                      >
                        <Text>Edit</Text>
                      </Pressable>
                      <Pressable
                        style={{
                          backgroundColor: "#F5F5F5",
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          borderWidth: 0.9,
                          borderColor: "#D0D0D0",
                        }}
                      >
                        <Text>Remove</Text>
                      </Pressable>
                      <Pressable
                        style={{
                          backgroundColor: "#F5F5F5",
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          borderWidth: 0.9,
                          borderColor: "#D0D0D0",
                        }}
                      >
                        <Text>Set as Default</Text>
                      </Pressable>
                    </View>
                    <View>
                      {selectedAddress && selectedAddress._id === item?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={{
                            backgroundColor: "#008397",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ textAlign: "center", color: "white" }}>
                            Deliver to this Address
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </Pressable>
          </View>
        )}

        {currentStep == 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Choose your delivery options
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                padding: 8,
                gap: 7,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              {option ? (
                <FontAwesome
                  onPress={() => setOption(!option)}
                  name="dot-circle-o"
                  size={24}
                  color="black"
                />
              ) : (
                <Entypo
                  onPress={() => setOption(!option)}
                  name="circle"
                  size={20}
                  color="black"
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text style={{ color: "green", fontWeight: "500" }}>
                  Tomorrow by 10pm &nbsp;
                </Text>
                - FREE delivery with your Prime membership
              </Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}

        {currentStep == 2 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Select your payment Method
            </Text>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedOption == "cash" ? (
                <Pressable
                  style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
                  onPress={() => setSelectedOption("cash")}
                >
                  <FontAwesome
                    onPress={() => setSelectedOption("cash")}
                    name="dot-circle-o"
                    size={24}
                    color="#008397"
                  />
                  <Text>Cash on Delivery</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
                  onPress={() => setSelectedOption("cash")}
                >
                  <Entypo
                    onPress={() => setSelectedOption("cash")}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                  <Text>Cash on Delivery</Text>
                </Pressable>
              )}
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
              }}
            >
              {selectedOption == "card" ? (
                <Pressable
                  style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
                  onPress={() => setSelectedOption("card")}
                >
                  <FontAwesome
                    onPress={() => setSelectedOption("card")}
                    name="dot-circle-o"
                    size={24}
                    color="#008397"
                  />
                  <Text>UPI / Credit or Debit Card</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
                  onPress={() => setSelectedOption("card")}
                >
                  <Entypo
                    onPress={() => setSelectedOption("card")}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                  <Text>UPI / Credit or Debit Card</Text>
                </Pressable>
              )}
            </View>
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
