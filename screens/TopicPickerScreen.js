import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TOPICS = [
  "Climate and Weather",
  "Companies",
  "Crypto",
  "Economics",
  "Elections",
  "Entertainment",
  "Financials",
  "Health",
  "Mentions",
  "Politics",
];

export default function TopicPickerScreen({ navigation }) {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleDone = () => {
    if (selectedTopics.length > 0) {
      navigation.navigate("Main");
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const isDoneEnabled = selectedTopics.length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              <Text style={styles.kalshi}>Kalshi</Text>
              <Text style={styles.news}>News</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneHeaderButton}
            onPress={handleDone}
            disabled={!isDoneEnabled}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.doneHeaderText,
                isDoneEnabled && styles.doneHeaderTextEnabled,
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          nestedScrollEnabled={true}
        >
          <Text style={styles.title}>Topics you are interested in?</Text>

          <View style={styles.topicsContainer}>
            {TOPICS.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicButton,
                    isSelected && styles.topicButtonSelected,
                  ]}
                  onPress={() => toggleTopic(topic)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.topicText}>{topic}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  kalshi: {
    color: "#18C389",
  },
  news: {
    color: "#000000",
  },
  closeButton: {
    position: "absolute",
    left: 24,
    top: 16,
    zIndex: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "300",
  },
  doneHeaderButton: {
    position: "absolute",
    right: 20,
    top: 14,
    zIndex: 20,
    paddingVertical: 6,
    paddingHorizontal: 4,
    minWidth: 52,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  doneHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  doneHeaderTextEnabled: {
    color: "#08C285",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
    width: "100%",
    maxWidth: 1040,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginTop: 8,
    marginBottom: 24,
  },
  topicsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  topicButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topicButtonSelected: {
    borderColor: "#08C285",
    borderWidth: 2,
  },
  topicText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
});
