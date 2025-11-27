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
        {/* Header Container */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              <Text style={styles.kalshi}>Kalshi</Text>
              <Text style={styles.news}>News</Text>
            </Text>
          </View>

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Content Container */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          nestedScrollEnabled={true}
        >
          {/* Title */}
          <Text style={styles.title}>Topics you are interested in?</Text>

          {/* Topic buttons */}
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

          {/* Done button after topics */}
          <TouchableOpacity
            style={[
              styles.doneButton,
              isDoneEnabled && styles.doneButtonEnabled,
            ]}
            onPress={handleDone}
            disabled={!isDoneEnabled}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.doneButtonText,
                isDoneEnabled && styles.doneButtonTextEnabled,
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginTop: 24,
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
  doneButton: {
    backgroundColor: "#9CE6CD",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  doneButtonEnabled: {
    backgroundColor: "#08C285",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FDFFFF",
  },
  doneButtonTextEnabled: {
    color: "#FFFFFF",
  },
});
