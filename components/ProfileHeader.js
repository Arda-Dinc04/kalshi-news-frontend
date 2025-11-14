import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        <Text style={styles.kalshi}>Kalshi</Text>
        <Text style={styles.news}>News</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E7EB",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  kalshi: {
    color: "#18C389",
  },
  news: {
    color: "#000000",
  },
});
