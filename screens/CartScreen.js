import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  const dispatch = useDispatch();

  const incrementQuant = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decrementQuant = (item) => {
    dispatch(decrementQuantity(item));
  };
  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
        </View>
        <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

        <Pressable
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text>Proceed to Buy ({cart.length}) items</Text>
        </Pressable>
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        />
        <View style={{ marginHorizontal: 10 }}>
          {cart?.map((item, index) => (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#F0F0F0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
              key={index}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 140, height: 140, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                </View>
                <View>
                  <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                  >
                    {item?.price}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc7000ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}>In Stock</Text>
                  {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
                </View>
                <View></View>
              </Pressable>

              <Pressable
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}
                >
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => decrementQuant(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <AntDesign name="minus" size={24} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => decrementQuant(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </Pressable>
                  )}
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}
                  >
                    <Text>{item?.quantity}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => incrementQuant(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Feather name="plus" size={24} color="black" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => removeItem(item)}
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Delete</Text>
                </Pressable>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: "row",
                  marginBottom: 15,
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Save for later</Text>
                </Pressable>
                <Pressable>
                  <Text
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    See More Like this
                  </Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
