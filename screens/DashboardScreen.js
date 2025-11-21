import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card, Button } from "react-native-paper";
import DashboardHeader from "../components/DashboardHeader";
import MarketChart from "../components/MarketChart";

export default function DashboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  return (
    <View style={styles.container}>
      <DashboardHeader />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* creating a scrollable section of the categories for news */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {["Trending", "Politics", "Sports", "Culture", "Crypto"].map(
            (curr) => (
              <TouchableOpacity
                key={curr}
                onPress={() => setSelectedCategory(curr)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    curr === selectedCategory
                      ? styles.categoryActive
                      : styles.categoryInactive,
                  ]}
                >
                  {curr}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {/* Market Chart Component */}
        <Text style={styles.sectionTitle}>Your Holdings</Text>
        <View style={styles.chartContainer}>
          <MarketChart />
        </View>

        <Text style={styles.sectionTitle}>For You</Text>

        {/* Card component */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>
              Kalshi markets still forecast record-breaking shutdown
            </Text>
            <Text style={styles.cardCategory}>Politics</Text>

            <View style={styles.cardRow}>
              <View>
                <Text style={styles.cardText}>J.D. Vance 32%</Text>
                <Text style={styles.cardText}>Gavin Newsom 22%</Text>
              </View>
              <Button
                mode="contained"
                buttonColor="#10b981"
                style={styles.viewButton}
                onPress={() => console.log("View details")}
              >
                View
              </Button>
            </View>
          </Card.Content>
        </Card>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryScroll: {
    marginBottom: 24,
    marginTop: 8,
  },
  categoryText: {
    fontSize: 18,
    marginRight: 24,
  },
  categoryActive: {
    fontWeight: "700",
    color: "#000000",
  },
  categoryInactive: {
    color: "#9CA3AF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardCategory: {
    color: "#9CA3AF",
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    color: "#374151",
  },
  viewButton: {
    borderRadius: 20,
    paddingHorizontal: 4,
  },
});
