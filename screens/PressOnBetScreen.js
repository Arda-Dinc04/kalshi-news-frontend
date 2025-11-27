import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import DashboardHeader from "../components/DashboardHeader";
import { getNewsByEvent, getEventById } from "../services/api";

export default function PressOnBetScreen({ navigation, route }) {
  const [selectedVote, setSelectedVote] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(null);

  const eventId = route?.params?.eventId; // Mongo _id
  const eventTicker = route?.params?.eventTicker; // ticker string

  useEffect(() => {
    if (eventId && eventTicker) {
      fetchEventAndNews();
    }
  }, [eventId, eventTicker]);

  const fetchEventAndNews = async () => {
    try {
      setLoading(true);
      const [event, news] = await Promise.all([
        getEventById(eventTicker), // <— ticker
        getNewsByEvent(eventId), // <— _id
      ]);
      setEventData(event);
      
      const allNews = Array.isArray(news) ? news : [];
      setNewsArticles(allNews);
    } catch (error) {
      console.error("Error fetching event/news:", error);
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const market = eventData?.markets?.[0];
  // Prefer the event question; fall back to market name, then generic
  const betTitle =
    eventData?.title || market?.name || "Market question";
  const yesPrice = market?.yes_price || 0;
  const noPrice = market?.no_price || 0;
  
  // Convert prices to percentages
  const total = yesPrice + noPrice;
  const yesPercentage = total > 0 ? Math.round((yesPrice / total) * 100) : 0;
  const noPercentage = total > 0 ? Math.round((noPrice / total) * 100) : 0;
  
  const candidates = [
    { name: "Yes", percentage: yesPercentage },
    { name: "No", percentage: noPercentage },
  ];

  const extractSourceFromUrl = (url) => {
    if (!url) return "Unknown";
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "").split(".")[0];
    } catch {
      return "Unknown";
    }
  };

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* showcasing the bet at the top of the page */}
        <View style={styles.betCard}>
          <View style={styles.betHeader}>
            <Image
              source={require("../assets/kalshiLogo.png")}
              style={styles.betIcon}
            />
            <Text style={styles.betTitle}>{betTitle}</Text>
          </View>

          {/* showcasing the candidates and their percentages */}
          {candidates.map((candidate, index) => (
            <View key={index} style={styles.candidateRow}>
              <Text style={styles.candidateName}>{candidate.name}</Text>
              <View style={styles.candidateRight}>
                <Text style={styles.candidatePercentage}>
                  {candidate.percentage}%
                </Text>
                <TouchableOpacity
                  style={[
                    styles.voteButton,
                    styles.yesButton,
                    selectedVote === `${index}-yes` && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedVote(`${index}-yes`)}
                >
                  <Text
                    style={[
                      styles.yesButtonText,
                      selectedVote === `${index}-yes` &&
                        styles.selectedButtonText,
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.voteButton,
                    styles.noButton,
                    selectedVote === `${index}-no` && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedVote(`${index}-no`)}
                >
                  <Text
                    style={[
                      styles.noButtonText,
                      selectedVote === `${index}-no` &&
                        styles.selectedButtonText,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* mapping through news articles related to the bet */}
        {loading ? (
          <Text style={styles.loadingText}>Loading related news...</Text>
        ) : newsArticles.length > 0 ? (
          newsArticles.map((article) => (
            <TouchableOpacity 
              key={article.id || article._id} 
              style={styles.newsCard}
              onPress={() => {
                if (article.canonical_url) {
                  Linking.openURL(article.canonical_url).catch((err) =>
                    console.error("Failed to open URL:", err)
                  );
                }
              }}
            >
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{article.title}</Text>
                {article.snippet && (
                  <Text style={styles.newsSnippet} numberOfLines={2}>
                    {article.snippet}
                  </Text>
                )}
              </View>
              <View style={styles.newsRight}>
                <Image
                  source={
                    article.thumbnail
                      ? { uri: article.thumbnail }
                      : require("../assets/kalshiLogo.png")
                  }
                  style={styles.newsImage}
                />
                <Text style={styles.newsSource}>
                  {article.source || extractSourceFromUrl(article.canonical_url)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No related news available</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  betCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 8,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  betHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  betIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  betTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  candidateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  candidateName: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  candidateRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  candidatePercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },
  voteButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  yesButton: {
    backgroundColor: "#EEF2FF",
    borderColor: "#0342FF",
  },
  noButton: {
    backgroundColor: "#F9EDFF",
    borderColor: "#9F5FFF",
  },
  selectedButton: {
    opacity: 1,
  },
  yesButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#275CFF",
  },
  noButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B626FF",
  },
  selectedButtonText: {
    color: "#000",
  },
  newsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  newsContent: {
    flex: 1,
    marginRight: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    lineHeight: 22,
  },
  newsCategory: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  newsRight: {
    alignItems: "flex-end",
  },
  newsImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginBottom: 4,
  },
  newsSource: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  newsSnippet: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 18,
  },
  loadingText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 20,
  },
});
