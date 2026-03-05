import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MachineryLoanScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    machineryType: "",
    loanAmount: "",
    businessType: "",
    experience: "",
    monthlyIncome: "",
    city: "",
  });

  // ---------------- SUBMIT FUNCTION ----------------
  const handleSubmit = () => {
    console.log("Machinery Loan Data:", formData);
    Alert.alert("Success", "Machinery Loan Application Submitted!");
    navigation.navigate("Dashboard");
  };

  // ---------------- STEP UI ----------------
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.title}>Type of Machinery</Text>

            {["Construction", "Agriculture", "Manufacturing", "Medical"].map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.card,
                    formData.machineryType === item && styles.selected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, machineryType: item });
                    setStep(2);
                  }}
                >
                  <Text style={styles.cardText}>{item}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.title}>Required Loan Amount</Text>

            {[
              "Below ₹5 Lacs",
              "₹5 Lacs - ₹10 Lacs",
              "₹10 Lacs - ₹25 Lacs",
              "Above ₹25 Lacs",
            ].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.card,
                  formData.loanAmount === amount && styles.selected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, loanAmount: amount });
                  setStep(3);
                }}
              >
                <Text style={styles.cardText}>{amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.title}>Business Type</Text>

            {["Proprietorship", "Partnership", "Private Limited", "LLP"].map(
              (type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.card,
                    formData.businessType === type && styles.selected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, businessType: type });
                    setStep(4);
                  }}
                >
                  <Text style={styles.cardText}>{type}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.title}>Years of Business Experience</Text>

            {["Less than 1 Year", "1 - 3 Years", "3 - 5 Years", "5+ Years"].map(
              (exp) => (
                <TouchableOpacity
                  key={exp}
                  style={[
                    styles.card,
                    formData.experience === exp && styles.selected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, experience: exp });
                    setStep(5);
                  }}
                >
                  <Text style={styles.cardText}>{exp}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={styles.title}>Monthly Income</Text>

            <TextInput
              placeholder="Enter Monthly Income"
              placeholderTextColor="#777"
              keyboardType="numeric"
              style={styles.input}
              value={formData.monthlyIncome}
              onChangeText={(text) =>
                setFormData({ ...formData, monthlyIncome: text })
              }
            />

            <Text style={styles.title}>City</Text>

            <TextInput
              placeholder="Enter City"
              placeholderTextColor="#777"
              style={styles.input}
              value={formData.city}
              onChangeText={(text) =>
                setFormData({ ...formData, city: text })
              }
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
        >
          <Ionicons name="arrow-back" size={24} color="#40E0D0" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Machinery Loan 🏗️</Text>
        <Text style={styles.stepText}>{step}/5</Text>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressBar}>
        <View style={{ ...styles.progressFill, width: `${(step / 5) * 100}%` }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {renderStep()}
      </ScrollView>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => {
          if (step < 5) {
            setStep(step + 1);
          } else {
            handleSubmit();
          }
        }}
      >
        {step === 5 ? (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
        ) : (
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MachineryLoanScreen;

// ---------------- STYLES ----------------

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

  stepText: {
    color: "#888",
  },

  progressBar: {
    height: 4,
    backgroundColor: "#222",
  },

  progressFill: {
    height: 4,
    backgroundColor: "#40E0D0",
  },

  title: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#1c1c24",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
  },

  selected: {
    borderWidth: 1.5,
    borderColor: "#40E0D0",
  },

  cardText: {
    color: "#fff",
    fontSize: 16,
  },

  input: {
    backgroundColor: "#1c1c24",
    padding: 16,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
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