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

import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "../config/firebaseConfig";

const CreditCardScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    employmentType: "",
    monthlyIncome: "",
    city: "",
  });

  // ---------------- SAVE TO FIREBASE ----------------
  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "creditCardApplications"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Credit Card Application Submitted!");
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  // ---------------- STEP UI ----------------
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.title}>Personal Details</Text>

            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#777"
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) =>
                setFormData({ ...formData, fullName: text })
              }
            />

            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#777"
              keyboardType="numeric"
              style={styles.input}
              value={formData.mobile}
              onChangeText={(text) =>
                setFormData({ ...formData, mobile: text })
              }
            />

            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#777"
              style={styles.input}
              value={formData.email}
              onChangeText={(text) =>
                setFormData({ ...formData, email: text })
              }
            />
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.title}>Employment Type</Text>

            {["Salaried", "Self Employed", "Business Owner"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.card,
                  formData.employmentType === type && styles.selected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, employmentType: type });
                  setStep(3);
                }}
              >
                <Text style={styles.cardText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.title}>Financial Details</Text>

            <TextInput
              placeholder="Monthly Income"
              placeholderTextColor="#777"
              keyboardType="numeric"
              style={styles.input}
              value={formData.monthlyIncome}
              onChangeText={(text) =>
                setFormData({ ...formData, monthlyIncome: text })
              }
            />

            <TextInput
              placeholder="City"
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

        <Text style={styles.headerTitle}>Credit Card 💳</Text>
        <Text style={styles.stepText}>{step}/3</Text>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressBar}>
        <View
          style={{ ...styles.progressFill, width: `${(step / 3) * 100}%` }}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {renderStep()}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => {
          if (step < 3) {
            setStep(step + 1);
          } else {
            handleSubmit();
          }
        }}
      >
        {step === 3 ? (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
        ) : (
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreditCardScreen;

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