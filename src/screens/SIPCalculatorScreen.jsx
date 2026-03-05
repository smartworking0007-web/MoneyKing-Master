import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const SIPCalculatorScreen = ({ navigation }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [years, setYears] = useState("");

  const [futureValue, setFutureValue] = useState(null);
  const [totalInvested, setTotalInvested] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);

  const calculateSIP = () => {
    if (!monthlyInvestment || !annualReturn || !years) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const P = Number(monthlyInvestment);
    const r = Number(annualReturn) / 12 / 100;
    const n = Number(years) * 12;

    const future =
      P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const invested = P * n;
    const returns = future - invested;

    setFutureValue(future.toFixed(2));
    setTotalInvested(invested.toFixed(2));
    setTotalReturns(returns.toFixed(2));
  };

  const chartData =
    futureValue && totalInvested && totalReturns
      ? [
          {
            name: "Invested",
            amount: Number(totalInvested),
            color: "#40E0D0",
            legendFontColor: "#fff",
            legendFontSize: 14,
          },
          {
            name: "Returns",
            amount: Number(totalReturns),
            color: "#0056b3",
            legendFontColor: "#fff",
            legendFontSize: 14,
          },
        ]
      : [];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#40E0D0" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>SIP Calculator</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* PIE CHART */}
        {futureValue && (
          <View style={styles.chartCard}>
            <PieChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                color: () => `#fff`,
              }}
              accessor={"amount"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>
        )}

        <Text style={styles.title}>Investment Details</Text>

        <TextInput
          placeholder="Monthly Investment (₹)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={monthlyInvestment}
          onChangeText={setMonthlyInvestment}
        />

        <TextInput
          placeholder="Expected Return (%)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={annualReturn}
          onChangeText={setAnnualReturn}
        />

        <TextInput
          placeholder="Duration (Years)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={years}
          onChangeText={setYears}
        />

        {futureValue && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Total Invested</Text>
            <Text style={styles.resultValue}>₹ {totalInvested}</Text>

            <Text style={styles.resultLabel}>Estimated Returns</Text>
            <Text style={styles.resultValue}>₹ {totalReturns}</Text>

            <Text style={styles.resultLabel}>Future Value</Text>
            <Text style={styles.resultValue}>₹ {futureValue}</Text>
          </View>
        )}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={calculateSIP}
      >
        <Ionicons name="calculator" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SIPCalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f13",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1c1c24",
    padding: 16,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: "#1c1c24",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  resultLabel: {
    color: "#888",
    fontSize: 14,
    marginTop: 10,
  },
  resultValue: {
    color: "#40E0D0",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  chartCard: {
    backgroundColor: "#1c1c24",
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 25,
    alignItems: "center",
  },
  floatingBtn: {
    position: "absolute",
    right: 25,
    bottom: 40,
    backgroundColor: "#0056b3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});