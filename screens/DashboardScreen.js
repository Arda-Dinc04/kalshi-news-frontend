import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import Header from "../components/Header";
import MarketChart from "../components/MarketChart";

export default function DashboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  return (
    // creating a view for the dashboard screen, with padding, flexbox and background color as gray for now
    <View className="flex-1 bg-gray-50 px-4">
      {/* importing the header component */}
      <Header />
      {/* creating a scrollview , which is different from a typical view as it enables horizontal scrolling for trending news categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {["Trending", "Politics", "Sports", "Culture", "Crypto"].map((curr) => (
          <TouchableOpacity
            key={curr}
            onPress={() => setSelectedCategory(curr)}
          >
            <Text
              //  if the user is currently clicked on a category, make the text bold and black, else gray
              className={`mr-4 text-base ${
                curr === selectedCategory
                  ? "font-bold text-black"
                  : "text-gray-400"
              }`}
            >
              {curr}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Market Chart Component */}
      <Text className="text-lg font-semibold text-gray-700 mb-3">
        Your Holdings
      </Text>
      <View className="h-auto bg-white rounded-2xl justify-center items-center mb-4 shadow-sm ">
        <MarketChart />
      </View>
      <Text className="text-lg font-semibold text-gray-700 mb-3">For You</Text>

      {/* creating a card component here which will contain information about a bet, who is leading and a button to view more details */}
      <Card
        style={{
          marginBottom: 16,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Card.Content>
          <Text className="text-lg font-semibold mb-1">
            Kalshi markets still forecast record-breaking shutdown
          </Text>
          <Text className="text-gray-400 mb-3">Politics</Text>

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-700">J.D. Vance 32%</Text>
              <Text className="text-gray-700">Gavin Newsom 22%</Text>
            </View>
            <Button
              mode="contained"
              buttonColor="#10b981"
              style={{ borderRadius: 20, paddingHorizontal: 4 }}
              onPress={() => console.log("View details")}
            >
              View
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
