import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const CATEGORIES = [
  "anything",
  "politics",
  "sports",
  "culture",
  "crypto",
  "climate",
  "economics",
  "mentions",
  "companies",
  "financials",
];

export default function OnboardingScreen({ navigation }) {
  const splashOpacity = useSharedValue(0);
  const mainScreenOpacity = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [splashDone, setSplashDone] = useState(false);
  const wheelOffset = useSharedValue(0);

  useEffect(() => {
    // Start with splash visible, fade in KalshiNews
    splashOpacity.value = 0;
    splashOpacity.value = withDelay(200, withTiming(1, { duration: 1500 }));

    // Keep it visible for 2 seconds, then fade out
    setTimeout(() => {
      splashOpacity.value = withTiming(0, { duration: 800 });
      // Mark splash as done after fade out
      setTimeout(() => {
        setSplashDone(true);
      }, 800);
    }, 3000);

    // Fade in main screen after splash fades out
    setTimeout(() => {
      mainScreenOpacity.value = withTiming(1, { duration: 800 });
    }, 3600);
  }, []);

  useEffect(() => {
    // Continuous smooth wheel rotation
    const interval = setInterval(() => {
      // Smoothly slide up
      wheelOffset.value = withTiming(-50, {
        duration: 800,
      });

      // After animation, update index and reset position
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % CATEGORIES.length);
        wheelOffset.value = 0;
      }, 800);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const splashAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: splashOpacity.value,
    };
  });

  const mainScreenAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: mainScreenOpacity.value,
    };
  });

  const handleConnectWallet = () => {
    // Navigate to main app with bottom tabs
    console.log("Connect wallet pressed!");
    if (navigation) {
      navigation.navigate("Main");
    }
  };

  const handleCreateWallet = () => {
    console.log("Create wallet pressed");
  };

  const wheelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: wheelOffset.value }],
    };
  });

  const renderWheel = () => {
    return (
      <View style={styles.wheelContainer}>
        <Text style={styles.tradeOnText}>Trade on</Text>
        <View style={styles.wheelWordsWrapper}>
          <Animated.View style={[styles.wheelInner, wheelAnimatedStyle]}>
            {[-2, -1, 0, 1, 2].map((offset) => {
              const index =
                (currentIndex + offset + CATEGORIES.length) % CATEGORIES.length;

              const animatedOpacity = useAnimatedStyle(() => {
                // Calculate position - offset -1 should be at 100% (aligned with Trade on)
                // wheelOffset goes from 0 to -50, so we adjust
                const relativePosition = offset + 1 + wheelOffset.value / 50;
                const distance = Math.abs(relativePosition);

                // Only perfectly aligned word (distance = 0) is 100%
                // Everything else fades based on distance
                let opacity;
                if (distance < 1) {
                  // Linear fade from 100% to 35%
                  opacity = 1.0 - distance * 0.65;
                } else if (distance < 2) {
                  // Linear fade from 35% to 12%
                  opacity = 0.35 - (distance - 1) * 0.23;
                } else {
                  // Fade to 0
                  opacity = Math.max(0, 0.12 - (distance - 2) * 0.12);
                }

                return {
                  opacity: Math.max(0, Math.min(1, opacity)),
                };
              });

              return (
                <Animated.Text
                  key={`${index}-${offset}`}
                  style={[styles.wheelWord, animatedOpacity]}
                >
                  {CATEGORIES[index]}
                </Animated.Text>
              );
            })}
          </Animated.View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#05D593", "#09A973"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Splash Screen - KalshiNews */}
      <Animated.View
        style={[styles.splashContainer, splashAnimatedStyle]}
        pointerEvents={splashDone ? "none" : "auto"}
      >
        <Text style={styles.splashText}>
          <Text style={styles.kalshi}>Kalshi</Text>
          <Text style={styles.news}>News</Text>
        </Text>
      </Animated.View>

      {/* Main Onboarding Screen */}
      <Animated.View style={[styles.mainContainer, mainScreenAnimatedStyle]}>
        {/* Kalshi Logo at top */}
        <View style={styles.header}>
          <Text style={styles.kalshiHeader}>Kalshi</Text>
        </View>

        {/* Rotating wheel */}
        <View style={styles.centerContent}>{renderWheel()}</View>

        {/* Buttons at bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnectWallet}
          >
            <Text style={styles.connectButtonText}>📱 Connect your wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateWallet}
          >
            <Text style={styles.createButtonText}>Create wallet</Text>
          </TouchableOpacity>

          <View style={styles.bottomTextContainer}>
            <Text style={styles.dontHaveText}>Don't have a wallet? </Text>
            <TouchableOpacity onPress={handleCreateWallet}>
              <Text style={styles.createOneText}>Create One.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  // Splash screen styles
  splashContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  splashText: {
    fontSize: 64,
    fontWeight: "800",
    letterSpacing: -2,
  },
  kalshi: {
    color: "#0B7150",
  },
  news: {
    color: "#FFFEFF",
  },
  // Main screen styles
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  kalshiHeader: {
    fontSize: 40,
    fontWeight: "700",
    color: "#0B7150",
    letterSpacing: -1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },
  wheelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tradeOnText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FFFEFF",
    marginRight: 8,
    lineHeight: 50,
  },
  wheelWordsWrapper: {
    height: 250,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-start",
    minWidth: 180,
  },
  wheelInner: {
    alignItems: "flex-start",
    marginTop: 100,
  },
  wheelWord: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FFFEFF",
    textAlign: "left",
    lineHeight: 50,
    height: 50,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  connectButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#10AD77",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  connectButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  createButton: {
    backgroundColor: "#08C285",
    borderWidth: 2,
    borderColor: "#10AD77",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFEFF",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dontHaveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#006A47",
  },
  createOneText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EFF9F7",
    textDecorationLine: "underline",
  },
});
