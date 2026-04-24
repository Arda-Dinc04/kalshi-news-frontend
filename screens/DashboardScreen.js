import React, { useEffect, useMemo, useState } from "react";
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
import { getEvents } from "../services/api";

const CATEGORY_ORDER = [
  "Politics",
  "Sports",
  "Entertainment",
  "Economics",
  "Elections",
  "Mentions",
  "Health",
  "Climate and Weather",
  "Companies",
  "Crypto",
  "Financials",
];

const chartLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function getActivityValue(event) {
  return (event.markets || []).reduce(
    (sum, market) => sum + (market?.volume || 0),
    0
  );
}

function getPrimaryMarket(event) {
  if (!Array.isArray(event.markets) || event.markets.length === 0) {
    return null;
  }

  return [...event.markets].sort(
    (a, b) => (b?.volume || 0) - (a?.volume || 0)
  )[0];
}

function getPreferredNews(event) {
  const relatedNews = Array.isArray(event.related_news) ? event.related_news : [];

  return (
    relatedNews.find((article) => article?.title || article?.canonical_url) || null
  );
}

function sortEvents(events) {
  return [...events].sort((a, b) => {
    const newsDiff =
      (b?.related_news?.length || 0) - (a?.related_news?.length || 0);

    if (newsDiff !== 0) {
      return newsDiff;
    }

    const activityDiff = getActivityValue(b) - getActivityValue(a);
    if (activityDiff !== 0) {
      return activityDiff;
    }

    return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
  });
}

export default function DashboardScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
      setLastSyncedAt(new Date());
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Live market data is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const availableCategories = useMemo(() => {
    const categories = [...new Set(events.map((event) => event.category).filter(Boolean))];

    const ordered = categories.sort((left, right) => {
      const leftIndex = CATEGORY_ORDER.indexOf(left);
      const rightIndex = CATEGORY_ORDER.indexOf(right);

      if (leftIndex === -1 && rightIndex === -1) {
        return left.localeCompare(right);
      }

      if (leftIndex === -1) {
        return 1;
      }

      if (rightIndex === -1) {
        return -1;
      }

      return leftIndex - rightIndex;
    });

    return ["Trending", ...ordered];
  }, [events]);

  const visibleEvents = useMemo(() => {
    const eventsWithMarkets = events.filter((event) => getPrimaryMarket(event));

    const filteredEvents =
      selectedCategory === "Trending"
        ? eventsWithMarkets
        : eventsWithMarkets.filter((event) => event.category === selectedCategory);

    return sortEvents(filteredEvents).slice(0, 12);
  }, [events, selectedCategory]);

  const chartData = useMemo(() => {
    const recentEvents = [...events]
      .filter((event) => getPrimaryMarket(event) && getActivityValue(event) > 0)
      .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
      .slice(0, 5)
      .reverse();

    if (recentEvents.length === 0) {
      return {
        labels: ["Now"],
        values: [0],
        tooltipTitles: ["No live activity yet"],
      };
    }

    return {
      labels: recentEvents.map((event) =>
        chartLabelFormatter.format(new Date(event.updatedAt || Date.now()))
      ),
      values: recentEvents.map((event) => getActivityValue(event)),
      tooltipTitles: recentEvents.map((event) => event.title || "Active market"),
    };
  }, [events]);

  const statusText = lastSyncedAt
    ? `Last synced ${lastSyncedAt.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })} · ${visibleEvents.length} live events`
    : "Fetching live market data";

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
          {availableCategories.map((curr) => (
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

        <View style={styles.sectionHeader}>
          <Text style={styles.holdingsTitle}>Recent Market Activity</Text>
          <TouchableOpacity onPress={fetchEvents} activeOpacity={0.7}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.statusText}>{statusText}</Text>
        <View style={styles.chartContainer}>
          <MarketChart
            labels={chartData.labels}
            values={chartData.values}
            tooltipTitles={chartData.tooltipTitles}
          />
        </View>

        <Text style={styles.forYouTitle}>For You</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <Text style={styles.loadingText}>Loading events...</Text>
        ) : visibleEvents.length === 0 ? (
          <Text style={styles.loadingText}>
            No live events are available for this category yet.
          </Text>
        ) : (
          visibleEvents.map((event, index) => {
              const market = getPrimaryMarket(event);
              const preferredNews = getPreferredNews(event);
              const yesPrice = market?.yes_price || 0;
              const noPrice = market?.no_price || 0;
              const total = yesPrice + noPrice;
              const yesPercentage =
                total > 0 ? Math.round((yesPrice / total) * 100) : 0;
              const noPercentage =
                total > 0 ? Math.round((noPrice / total) * 100) : 0;
              const newsImage = preferredNews?.thumbnail
                ? preferredNews.thumbnail
                : require("../assets/kalshiLogo.png");

              return (
                <NewsMarketCard
                  key={event._id || index}
                  newsTitle={
                    preferredNews?.title ||
                    event.title ||
                    "Live market update"
                  }
                  newsCategory={event.category || "Uncategorized"}
                  newsImage={newsImage}
                  newsUrl={preferredNews?.canonical_url}
                  marketIcon={require("../assets/kalshiLogo.png")}
                  marketQuestion={market?.name || event.title || "Market question"}
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  holdingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  refreshText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10C287",
  },
  statusText: {
    fontSize: 13,
    color: "#6B7280",
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
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 20,
  },
});
