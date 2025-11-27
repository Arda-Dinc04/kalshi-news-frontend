import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function NewsMarketCard({
  newsTitle,
  newsCategory,
  newsImage,
  marketIcon,
  marketQuestion,
  candidates,
  onSeeMorePress,
  newsUrl,
  isActive = true,
}) {
  const handleNewsPress = () => {
    if (newsUrl) {
      Linking.openURL(newsUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* News Header Section */}
      <TouchableOpacity
        style={styles.newsHeader}
        onPress={handleNewsPress}
        disabled={!newsUrl}
        activeOpacity={newsUrl ? 0.7 : 1}
      >
        <View style={styles.newsTextContainer}>
          <Text style={styles.newsTitle}>{newsTitle}</Text>
          <Text style={styles.newsCategory}>{newsCategory}</Text>
        </View>
        <Image 
          source={typeof newsImage === 'string' ? { uri: newsImage } : newsImage} 
          style={styles.newsImage} 
        />
      </TouchableOpacity>

      {/* Centered Dots */}
      <View style={styles.dotContainer}>
        <View
          style={[
            styles.dot,
            { backgroundColor: isActive ? "#000" : "#666666" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: isActive ? "#000" : "#666666" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: isActive ? "#000" : "#666666" },
          ]}
        />
      </View>

      {/* Market Prediction Section */}
      <View style={styles.marketSection}>
        <View style={styles.marketHeader}>
          <Image source={marketIcon} style={styles.marketIcon} />
          <Text style={styles.marketQuestion}>{marketQuestion}</Text>
        </View>

        {/* Candidates List */}
        {candidates.map((candidate, index) => (
          <View key={index} style={styles.candidateRow}>
            <View style={styles.candidateInfo}>
              <Text style={styles.candidateName}>{candidate.name}</Text>
              <Text style={styles.candidatePercentage}>
                {candidate.percentage}%
              </Text>
            </View>
            <View style={styles.voteButtonsContainer}>
              <LinearGradient
                colors={["#EEF2FF", "#F9EEFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientContainer}
              >
                <TouchableOpacity
                  style={[styles.voteButton, styles.yesButton]}
                  onPress={() => console.log("Yes pressed")}
                >
                  <Text style={styles.yesText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.voteButton, styles.noButton]}
                  onPress={() => console.log("No pressed")}
                >
                  <Text style={styles.noText}>No</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        ))}

        {/* See More Related Link */}
        <TouchableOpacity
          onPress={onSeeMorePress}
          style={styles.seeMoreContainer}
        >
          <Text style={styles.seeMoreText}>See more related</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  newsTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Golos Text, system-ui, -apple-system, sans-serif",
    color: "#000",
    marginBottom: 6,
    lineHeight: 18,
  },
  newsCategory: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Golos Text, system-ui, -apple-system, sans-serif",
    color: "#BEBEBE",
    marginBottom: 0,
  },
  dotContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  newsImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    resizeMode: "cover",
  },
  marketSection: {
    paddingTop: 0,
  },
  marketHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  marketIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
    resizeMode: "contain",
  },
  marketQuestion: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  candidateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  candidateInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  candidateName: {
    fontSize: 13,
    color: "#000",
    marginRight: 6,
  },
  candidatePercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  voteButtonsContainer: {
    flexDirection: "row",
  },
  gradientContainer: {
    flexDirection: "row",
    borderRadius: 6,
    overflow: "hidden",
  },
  voteButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: "#EEF2FF",
  },
  noButton: {
    backgroundColor: "#F9EEFF",
  },
  yesText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#275CFF",
  },
  noText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B222FF",
  },
  seeMoreContainer: {
    alignItems: "flex-end",
    marginTop: 4,
  },
  seeMoreText: {
    fontSize: 11,
    color: "#696969",
    textDecorationLine: "underline",
  },
});
