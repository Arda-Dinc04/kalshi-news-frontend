import "./global.css";
import "react-native-gesture-handler";
import "react-native-reanimated";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import DashboardScreen from "./screens/DashboardScreen";
import NavigationBar from "./components/NavigationBar";

export default function App() {
  return (
    <NavigationContainer>
      <NavigationBar />
    </NavigationContainer>
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
