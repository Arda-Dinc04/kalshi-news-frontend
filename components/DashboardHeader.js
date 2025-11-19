import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          <Text style={styles.kalshi}>Kalshi</Text>
          <Text style={styles.news}>News</Text>
        </Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>🔍 Search</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
  },
  kalshi: {
    color: "#18C389",
  },
  news: {
    color: "#000000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchText: {
    color: "#9CA3AF",
  },
});
