import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileHeader from "../components/ProfileHeader";

export default function ProfileScreen() {
  const bets = [
    {
      id: 1,
      title: "ETH > $3K by Oct 28",
      status: "Won",
      amount: "$50 USDC",
      category: "Crypto",
    },
    {
      id: 2,
      title: "ETH > $4K by Oct 26",
      status: "Lost",
      amount: "$50 USDC",
      category: "Crypto",
    },
    {
      id: 3,
      title: "ETH > $3K by Oct 28",
      status: "Won",
      amount: "$50 USDC",
      category: "Crypto",
    },
  ];

  return (
    <View style={styles.container}>
      <ProfileHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color="#fff" />
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>username</Text>
            <Text style={styles.memberSince}>Member since October 2025</Text>
          </View>
        </View>

        {/* Wallet Section */}
        <Text style={styles.sectionTitle}>Wallet</Text>
        <View style={styles.walletCard}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>1 E</Text>
          </View>
          <Text style={styles.balanceUsd}>3,740.10 USD</Text>

          <View style={styles.walletInfoRow}>
            <Text style={styles.walletInfo}>Ethereum Mainnet</Text>
            <Text style={styles.walletInfo}>Metamask</Text>
          </View>

          <Text style={styles.walletAddress}>0xA1b...9Cde</Text>

          <TouchableOpacity style={styles.etherscanButton}>
            <Text style={styles.etherscanButtonText}>View on Etherscan</Text>
          </TouchableOpacity>
        </View>

        {/* Betting Summary Section */}
        <Text style={styles.sectionTitle}>Betting Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Wagered</Text>
            <Text style={styles.summaryValue}>$10,000</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Won</Text>
            <Text style={styles.summaryValue}>$5,000</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Net Profit</Text>
            <Text style={styles.summaryValue}>$230</Text>
          </View>
        </View>

        {/* Recent Bets Section */}
        <Text style={styles.sectionTitle}>Recent Bets</Text>
        {bets.map((bet) => (
          <View key={bet.id} style={styles.betCard}>
            <View style={styles.betHeader}>
              <View style={styles.betLeft}>
                <Text style={styles.betTitle}>{bet.title}</Text>
                <Text
                  style={[
                    styles.betStatus,
                    bet.status === "Won" ? styles.betWon : styles.betLost,
                  ]}
                >
                  {bet.status} - {bet.amount}
                </Text>
                <Text style={styles.betCategory}>♡ {bet.category}</Text>
              </View>
              <TouchableOpacity style={styles.readNewsButton}>
                <Text style={styles.readNewsText}>Read Related News →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

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
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0B7150",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: "#BEBEBE",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#10C287",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  walletCard: {
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E7EB",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
  balanceUsd: {
    fontSize: 14,
    color: "#BEBEBE",
    textAlign: "right",
    marginBottom: 16,
  },
  walletInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  walletInfo: {
    fontSize: 14,
    color: "#000000",
  },
  walletAddress: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 16,
  },
  etherscanButton: {
    backgroundColor: "#10C287",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  etherscanButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E7EB",
    padding: 16,
    marginHorizontal: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  betCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E7EB",
  },
  betHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  betLeft: {
    flex: 1,
  },
  betTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 6,
  },
  betStatus: {
    fontSize: 14,
    marginBottom: 6,
  },
  betWon: {
    color: "#08C285",
  },
  betLost: {
    color: "#D37125",
  },
  betCategory: {
    fontSize: 12,
    color: "#BEBEBE",
  },
  readNewsButton: {
    marginLeft: 12,
  },
  readNewsText: {
    fontSize: 12,
    color: "#696969",
    textDecorationLine: "underline",
  },
});
