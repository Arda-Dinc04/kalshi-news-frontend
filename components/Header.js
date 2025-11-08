import { View, Text } from "react-native";
export default function Header() {
  return (
    <View className="bg-gray-50 px-4 pt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-3xl font-bold text-green-600">Kalshi</Text>
        <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-gray-400">🔍 Search</Text>
        </View>
      </View>
    </View>
  );
}
