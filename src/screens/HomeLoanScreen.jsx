import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const HomeLoanScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    employmentType: "",
    monthlyIncome: "",
    existingEMI: "",
    loanAmount: "",
    propertyValue: "",
    propertyType: "",
    city: "",
    state: "",
    pincode: "",
    loanTenure: "",
    cibilScore: "",
    coApplicant: "",
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantAadhar: null,
    coApplicantPan: null,
    coApplicantPhoto: null,
  });

  const renderStep = () => {
    switch (step) {
      // ================================
      // STEP 1 - EMPLOYMENT TYPE
      // ================================
      case 1:
        return (
          <View>
            <Text style={styles.title}>Employment Type</Text>
            {["Salaried", "Self Employed"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionCard,
                  formData.employmentType === type && styles.selected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, employmentType: type });
                  setStep(2);
                }}
              >
                <Text style={styles.optionText}>{type}</Text>
                <View
                  style={[
                    styles.radio,
                    formData.employmentType === type && styles.radioActive,
                  ]}
                >
                  {formData.employmentType === type && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      // ================================
      // STEP 2 - MONTHLY INCOME & EMI
      // ================================
      case 2:
        return (
          <View>
            <Text style={styles.title}>Income Details</Text>

            <Text style={styles.label}>Net Monthly Income</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter income"
              placeholderTextColor="#777"
              value={formData.monthlyIncome}
              onChangeText={(v) =>
                setFormData({ ...formData, monthlyIncome: v })
              }
            />

            <Text style={styles.label}>Existing EMIs (if any)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter total EMI"
              placeholderTextColor="#777"
              value={formData.existingEMI}
              onChangeText={(v) => setFormData({ ...formData, existingEMI: v })}
            />
          </View>
        );

      // ================================
      // STEP 3 - REQUIRED LOAN AMOUNT
      // ================================
      case 3:
        return (
          <View>
            <Text style={styles.title}>Required Loan Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter required amount"
              placeholderTextColor="#777"
              value={formData.loanAmount}
              onChangeText={(v) => setFormData({ ...formData, loanAmount: v })}
            />
          </View>
        );

      // ================================
      // STEP 4 - PROPERTY DETAILS
      // ================================
      case 4:
        return (
          <View>
            <Text style={styles.title}>Property Details</Text>

            <Text style={styles.label}>Property Value</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter property value"
              placeholderTextColor="#777"
              value={formData.propertyValue}
              onChangeText={(v) =>
                setFormData({ ...formData, propertyValue: v })
              }
            />

            <Text style={styles.label}>Property Type</Text>
            {["New", "Resale", "Under Construction"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionCard,
                  formData.propertyType === type && styles.selected,
                ]}
                onPress={() => setFormData({ ...formData, propertyType: type })}
              >
                <Text style={styles.optionText}>{type}</Text>
                <View
                  style={[
                    styles.radio,
                    formData.propertyType === type && styles.radioActive,
                  ]}
                >
                  {formData.propertyType === type && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      // ================================
      // STEP 5 - CITY & LOAN TENURE
      // ================================
      case 5:
        return (
          <View>
            <Text style={styles.title}>Location & Tenure</Text>

            <Text style={styles.label}>Property City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              placeholderTextColor="#777"
              value={formData.city}
              onChangeText={(v) => setFormData({ ...formData, city: v })}
            />

            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter state"
              placeholderTextColor="#777"
              value={formData.state}
              onChangeText={(v) => setFormData({ ...formData, state: v })}
            />

            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              placeholder="Enter 6-digit pincode"
              placeholderTextColor="#777"
              value={formData.pincode}
              onChangeText={(v) => setFormData({ ...formData, pincode: v })}
            />

            <Text style={styles.label}>Loan Tenure (Years)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter tenure"
              placeholderTextColor="#777"
              value={formData.loanTenure}
              onChangeText={(v) => setFormData({ ...formData, loanTenure: v })}
            />
          </View>
        );

      // ================================
      // STEP 6 - CIBIL SCORE
      // ================================
      case 6:
        return (
          <View>
            <Text style={styles.title}>Credit Score (CIBIL)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter CIBIL score"
              placeholderTextColor="#777"
              value={formData.cibilScore}
              onChangeText={(v) => setFormData({ ...formData, cibilScore: v })}
            />
          </View>
        );

      // ================================
      // STEP 7 - CO-APPLICANT
      // ================================
      case 7:
        return (
          <View>
            <Text style={styles.title}>Co-Applicant Available?</Text>

            {/* ================================
          YES / NO SELECTION
      ================================= */}
            {["Yes", "No"].map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.optionCard,
                  formData.coApplicant === val && styles.selected,
                ]}
                onPress={() => setFormData({ ...formData, coApplicant: val })}
              >
                <Text style={styles.optionText}>{val}</Text>
                <View
                  style={[
                    styles.radio,
                    formData.coApplicant === val && styles.radioActive,
                  ]}
                >
                  {formData.coApplicant === val && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </TouchableOpacity>
            ))}

            {/* =====================================================
          IF USER SELECTS YES → SHOW CO-APPLICANT DETAILS
      ===================================================== */}
            {formData.coApplicant === "Yes" && (
              <View style={{ marginTop: 20 }}>
                {/* ---------- CO-APPLICANT NAME ---------- */}
                <Text style={styles.label}>Co-Applicant Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor="#777"
                  value={formData.coApplicantName}
                  onChangeText={(v) =>
                    setFormData({ ...formData, coApplicantName: v })
                  }
                />

                {/* ---------- RELATION FIELD ---------- */}
                <Text style={styles.label}>Relation with Applicant</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Father / Wife / Brother etc."
                  placeholderTextColor="#777"
                  value={formData.coApplicantRelation}
                  onChangeText={(v) =>
                    setFormData({ ...formData, coApplicantRelation: v })
                  }
                />

                {/* ---------- AADHAR CARD UPLOAD ---------- */}
                <Text style={styles.label}>Upload Aadhaar Card</Text>
                <TouchableOpacity
                  style={styles.uploadBox}
                  onPress={async () => {
                    const result = await DocumentPicker.getDocumentAsync({});
                    if (result.assets) {
                      setFormData({
                        ...formData,
                        coApplicantAadhar: result.assets[0],
                      });
                    }
                  }}
                >
                  <Text style={styles.uploadText}>
                    {formData.coApplicantAadhar
                      ? "Aadhaar Uploaded ✅"
                      : "Select Aadhaar File"}
                  </Text>
                </TouchableOpacity>

                {/* ---------- PAN CARD UPLOAD ---------- */}
                <Text style={styles.label}>Upload PAN Card</Text>
                <TouchableOpacity
                  style={styles.uploadBox}
                  onPress={async () => {
                    const result = await DocumentPicker.getDocumentAsync({});
                    if (result.assets) {
                      setFormData({
                        ...formData,
                        coApplicantPan: result.assets[0],
                      });
                    }
                  }}
                >
                  <Text style={styles.uploadText}>
                    {formData.coApplicantPan
                      ? "PAN Uploaded ✅"
                      : "Select PAN File"}
                  </Text>
                </TouchableOpacity>

                {/* ---------- PASSPORT SIZE PHOTO ---------- */}
                <Text style={styles.label}>Upload Passport Size Photo</Text>
                <TouchableOpacity
                  style={styles.uploadBox}
                  onPress={async () => {
                    const permission =
                      await ImagePicker.requestMediaLibraryPermissionsAsync();

                    if (permission.granted) {
                      const image = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        quality: 0.7,
                      });

                      if (!image.canceled) {
                        setFormData({
                          ...formData,
                          coApplicantPhoto: image.assets[0],
                        });
                      }
                    }
                  }}
                >
                  <Text style={styles.uploadText}>
                    {formData.coApplicantPhoto
                      ? "Photo Uploaded ✅"
                      : "Select Photo"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  const handleSave = () => {
    console.log("Home Loan Data:", JSON.stringify(formData, null, 2));
    alert("Home Loan Application Submitted!");
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* BACK ARROW BUTTON */}
        <TouchableOpacity
          onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#40E0D0" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home Loan 🏠</Text>
        <Text style={styles.stepCount}>Steps {step}/7</Text>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[styles.progressFill, { width: `${(step / 7) * 100}%` }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => {
          if (step < 7) setStep(step + 1);
          else handleSave();
        }}
      >
        {step === 7 ? (
          <Text style={styles.buttonText}>Save</Text>
        ) : (
          <Ionicons name="arrow-forward" size={28} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

// ================================
// SAME THEME STYLES AS BUSINESS SCREEN
// ================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f13" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backText: { color: "#40E0D0", fontSize: 16 },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  stepCount: { color: "#888", fontSize: 13 },
  progressContainer: { height: 4, backgroundColor: "#222" },
  progressFill: { height: 4, backgroundColor: "#40E0D0" },
  scrollContent: { padding: 20, paddingBottom: 120 },
  title: { color: "#ccc", fontSize: 16, marginBottom: 20, fontWeight: "600" },
  optionCard: {
    backgroundColor: "#1c1c24",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selected: {
    borderWidth: 1.5,
    borderColor: "#40E0D0",
    backgroundColor: "#252530",
  },
  optionText: { color: "white", fontSize: 16 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  radioActive: { borderColor: "#40E0D0" },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#40E0D0",
  },
  label: { color: "#ccc", fontSize: 14, marginBottom: 8 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    color: "white",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 24,
  },
  actionButton: {
    position: "absolute",
    right: 24,
    bottom: 40,
    backgroundColor: "#0056b3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  //   Coplicant aadhar / pan / photo section

  uploadBox: {
    backgroundColor: "#1c1c24",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  uploadText: {
    color: "#40E0D0",
    fontSize: 14,
  },
//   back arrow button setup 
backButton: {
  padding: 6,
},
});

export default HomeLoanScreen;
