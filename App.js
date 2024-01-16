import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import { store } from "./store";
import { ModalPortal } from "react-native-modals";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserContextProvider } from "./context/UserContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserContextProvider>
        <Provider store={store}>
          <StatusBar translucent={true} backgroundColor="#00CED1" />
          <StackNavigator />
          <ModalPortal />
        </Provider>
      </UserContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
