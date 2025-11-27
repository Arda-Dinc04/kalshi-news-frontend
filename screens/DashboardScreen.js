import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DashboardHeader from "../components/DashboardHeader";
import MarketChart from "../components/MarketChart";
import NewsMarketCard from "../components/NewsMarketCard";
import { getEvents, getEventsByCategory } from "../services/api";

export default function DashboardScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map UI categories to API categories
  const categoryMap = {
    "Trending": null, // Show all events
    "Politics": "Politics",
    "Entertainment": "Entertainment",
    "Economics": "Economics",
    "Health": "Health",
    "Climate and Weather": "Climate and Weather",
    "Companies": "Companies",
    "Crypto": "Crypto",
    "Elections": "Elections",
    "Financials": "Economics", // Map Financials to Economics
    "Mentions": "Mentions",
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const apiCategory = categoryMap[selectedCategory];
      const data = apiCategory
        ? await getEventsByCategory(apiCategory)
        : await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DashboardHeader showSearch={true} />
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
          {[
            "Trending",
            "Politics",
            "Entertainment",
            "Economics",
            "Health",
            "Climate and Weather",
            "Companies",
            "Crypto",
            "Elections",
            "Financials",
            "Mentions",
          ].map((curr) => (
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
          ))}
        </ScrollView>

        {/* market Chart Component */}
        <Text style={styles.holdingsTitle}>Your Holdings</Text>
        <View style={styles.chartContainer}>
          <MarketChart />
        </View>

        <Text style={styles.forYouTitle}>For You</Text>

        {/* News Market Card component - dynamically loaded from API */}
        {loading ? (
          <Text style={styles.loadingText}>Loading events...</Text>
        ) : (
          events
            // only keep events that have at least one news item **with** a thumbnail
            .filter(
              (event) =>
                event.markets?.[0] &&
                event.related_news?.some((n) => n?.thumbnail)
            )
            .map((event, index) => {
              const market = event.markets[0];

              // pick the FIRST related_news that actually has a thumbnail
              const newsWithThumb =
                event.related_news.find((n) => n?.thumbnail) ||
                event.related_news[0];

              const yesPrice = market.yes_price || 0;
              const noPrice = market.no_price || 0;
              const total = yesPrice + noPrice;
              const yesPercentage =
                total > 0 ? Math.round((yesPrice / total) * 100) : 0;
              const noPercentage =
                total > 0 ? Math.round((noPrice / total) * 100) : 0;

              // Handle image fallback properly
              const newsImage = newsWithThumb?.thumbnail
                ? { uri: newsWithThumb.thumbnail }
                : require("../assets/kalshiLogo.png");

              return (
                <NewsMarketCard
                  key={event._id || index}
                  newsTitle={newsWithThumb?.title || "No title available"}
                  newsCategory={event.category || "Uncategorized"}
                  newsImage={newsImage}
                  newsUrl={newsWithThumb?.canonical_url}
                  marketIcon={require("../assets/kalshiLogo.png")}
                  marketQuestion={market.name || "Market question"}
                  candidates={[
                    { name: "Yes", percentage: yesPercentage },
                    { name: "No", percentage: noPercentage },
                  ]}
                  onSeeMorePress={() =>
                    navigation.navigate("PressOnBet", {
                      eventId: event._id,
                      eventTicker: event.event_ticker,
                    })
                  }
                  isActive={true}
                />
              );
            })
        )}

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
    fontSize: 16,
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
  holdingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#C5C5C5",
    marginBottom: 12,
  },
  forYouTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10C287",
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    height: 200,
  },
  loadingText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 20,
  },
});
