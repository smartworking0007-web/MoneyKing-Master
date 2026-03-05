import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";

import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "../config/firebaseConfig";

const screenWidth = Dimensions.get("window").width;

const LoanEMIScreen = ({ navigation }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // ---------------- EMI CALCULATION ----------------
  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const N = Number(tenure) * 12; // tenure in years → months

    const R = annualRate / 12 / 100;

    if (R === 0) {
      const emiValue = P / N;
      setEmi(emiValue.toFixed(2));
      setTotalPayment((emiValue * N).toFixed(2));
      setTotalInterest("0.00");
      return;
    }

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPay = emiValue * N;
    const totalInt = totalPay - P;

    setEmi(emiValue.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
  };

  // ---------------- SAVE TO FIREBASE ----------------
  const saveCalculation = async () => {
    try {
      await addDoc(collection(db, "emiCalculations"), {
        loanAmount,
        interestRate,
        tenure,
        emi,
        totalInterest,
        totalPayment,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "EMI Calculation Saved!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  // ---------------- PIE CHART DATA ----------------
  const chartData = emi
    ? [
        {
          name: "Principal",
          amount: Number(loanAmount),
          color: "#40E0D0",
          legendFontColor: "#fff",
          legendFontSize: 14,
        },
        {
          name: "Interest",
          amount: Number(totalInterest),
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
        <Text style={styles.headerTitle}>Loan EMI Calculator</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* ---------------- PIE CHART SECTION ---------------- */}
        {emi && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Loan Breakdown</Text>

            <PieChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: "#1c1c24",
                backgroundGradientFrom: "#1c1c24",
                backgroundGradientTo: "#1c1c24",
                color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />

            <Text style={styles.centerText}>
              Total Payable ₹ {totalPayment}
            </Text>
          </View>
        )}

        {/* ---------------- INPUT SECTION ---------------- */}
        <Text style={styles.title}>Loan Details</Text>

        <TextInput
          placeholder="Loan Amount (₹)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={loanAmount}
          onChangeText={setLoanAmount}
        />

        <TextInput
          placeholder="Interest Rate (%)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={interestRate}
          onChangeText={setInterestRate}
        />

        <TextInput
          placeholder="Tenure (Years)"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          value={tenure}
          onChangeText={setTenure}
        />

        {/* RESULT CARD */}
        {emi && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Monthly EMI</Text>
            <Text style={styles.resultValue}>₹ {emi}</Text>

            <Text style={styles.resultLabel}>Total Interest</Text>
            <Text style={styles.resultValue}>₹ {totalInterest}</Text>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={saveCalculation}
            >
              <Text style={styles.saveText}>Save Calculation</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={calculateEMI}
      >
        <Ionicons name="calculator" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default LoanEMIScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f13" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  chartCard: {
    backgroundColor: "#1c1c24",
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },

  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  centerText: {
    textAlign: "center",
    color: "#40E0D0",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
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

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#40E0D0",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  saveText: { color: "#000", fontWeight: "bold" },

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