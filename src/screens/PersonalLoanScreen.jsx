
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PersonalLoanScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const [formData, setFormData] = useState({
    employmentType: "",
    annualIncome: "",
    loanTenure: "",
    companyName: "",
    country: "India",
    city: "",
    loanAmount: "",
  });

  // Cities ko sirf tab fetch karenge jab user step 3 se step 4 pe ja raha ho
  const fetchCities = async () => {
    if (cities.length > 0) return; // already loaded → skip

    setIsLoadingCities(true);
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: "India" }),
        }
      );

      const data = await response.json();

      if (!data.error && Array.isArray(data.data)) {
        setCities(data.data.sort((a, b) => a.localeCompare(b)));
      } else {
        setCities([]);
      }
    } catch (error) {
      console.log("City Fetch Error:", error);
      setCities([]);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.sectionTitle}>Employment Type</Text>
            {[
              "Salaried",
              "Self Employed Business",
              "Self Employed Professional",
            ].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.card,
                  formData.employmentType === type && styles.selectedCard,
                ]}
                onPress={() => {
                  setFormData({ ...formData, employmentType: type });
                  setStep(2);
                }}
              >
                <Text style={styles.cardText}>{type}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    formData.employmentType === type && styles.radioOuterSelected,
                  ]}
                >
                  {formData.employmentType === type && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.sectionTitle}>Annual Income</Text>
            <View style={styles.gridContainer}>
              {[
                "₹1.2 - ₹1.8 Lac",
                "₹1.8 - ₹2.2 Lac",
                "₹2.2 - ₹2.4 Lac",
                "10 Lac+",
              ].map((income) => (
                <TouchableOpacity
                  key={income}
                  style={[
                    styles.gridCard,
                    formData.annualIncome === income && styles.selectedCard,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, annualIncome: income });
                    setStep(3);
                  }}
                >
                  <Text style={styles.cardText}>{income}</Text>
                  <View
                    style={[
                      styles.radioOuter,
                      formData.annualIncome === income && styles.radioOuterSelected,
                    ]}
                  >
                    {formData.annualIncome === income && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.sectionTitle}>Employment & Loan Detail</Text>

            <TextInput
              placeholder="Loan tenure in months"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="numeric"
              value={formData.loanTenure}
              onChangeText={(text) =>
                setFormData({ ...formData, loanTenure: text })
              }
            />

            <TextInput
              placeholder="Enter your Company Name"
              placeholderTextColor="#666"
              style={styles.input}
              value={formData.companyName}
              onChangeText={(text) =>
                setFormData({ ...formData, companyName: text })
              }
            />

            {isLoadingCities && (
              <View style={styles.preloadLoaderContainer}>
                <ActivityIndicator size="large" color="#40E0D0" />
                <Text style={styles.preloadText}>Preparing city list...</Text>
                <Text style={styles.preloadSubText}>
                  This will make the next step faster
                </Text>
              </View>
            )}
          </View>
        );

      case 4:
        return (
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Your City (India)</Text>

            <TextInput
              placeholder="Search city / district name..."
              placeholderTextColor="#666"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {isLoadingCities ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#40E0D0" />
                <Text style={styles.loaderText}>Loading cities...</Text>
              </View>
            ) : cities.length === 0 ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={50} color="#ff5555" />
                <Text style={styles.errorText}>Failed to load cities</Text>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={fetchCities}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {cities
                  .filter((city) =>
                    city.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((city) => (
                    <TouchableOpacity
                      key={city}
                      style={[
                        styles.cityItem,
                        formData.city === city && styles.selectedCityItem,
                      ]}
                      onPress={() => {
                        setFormData({ ...formData, city });
                        setStep(5);
                      }}
                    >
                      <Text style={styles.cityText}>{city}</Text>
                      {formData.city === city && (
                        <Ionicons name="checkmark-circle" size={24} color="#40E0D0" />
                      )}
                    </TouchableOpacity>
                  ))}

                {cities.filter((c) =>
                  c.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && searchQuery !== "" && (
                  <Text style={styles.noResultsText}>
                    No cities match your search
                  </Text>
                )}
              </>
            )}
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={styles.sectionTitle}>Personal Loan Amount</Text>
            {["Upto ₹1 Lac", "₹1 - ₹3 Lac", "₹3 - ₹5 Lac", "₹10 Lac+"].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.card,
                  formData.loanAmount === amt && styles.selectedCard,
                ]}
                onPress={() => setFormData({ ...formData, loanAmount: amt })}
              >
                <Text style={styles.cardText}>{amt}</Text>
                <View
                  style={[
                    styles.radioOuter,
                    formData.loanAmount === amt && styles.radioOuterSelected,
                  ]}
                >
                  {formData.loanAmount === amt && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert(
      "Thank you! Your personal loan application has been successfully submitted.\n\nBest regards,\nMoney King Financial Services"
    );
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Loan 💸</Text>
        <Text style={styles.stepText}>Step {step}/5</Text>
      </View>

      <View style={styles.progressBarBase}>
        <View
          style={[styles.progressBarFill, { width: `${(step / 5) * 100}%` }]}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
        {renderStepContent()}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.nextBtn,
          (isLoadingCities && step === 3) && styles.nextBtnDisabled,
        ]}
        onPress={async () => {
          if (step === 3) {
            // Step 3 → 4 transition pe cities load karo
            await fetchCities();
            if (!isLoadingCities) {
              setStep(4);
            }
          } else if (step < 5) {
            setStep(step + 1);
          } else {
            handleSubmit();
          }
        }}
        disabled={isLoadingCities && step === 3}
      >
        {isLoadingCities && step === 3 ? (
          <ActivityIndicator size="small" color="white" />
        ) : step === 5 ? (
          <Text style={styles.submitText}>Submit</Text>
        ) : (
          <Ionicons name="chevron-forward" size={32} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F13" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTitle: { color: "white", fontSize: 19, fontWeight: "bold" },
  stepText: { color: "#888", fontSize: 13 },
  progressBarBase: { height: 3, backgroundColor: "#222", width: "100%" },
  progressBarFill: { height: 3, backgroundColor: "#40E0D0" },

  sectionTitle: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#1C1C24",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#252530",
    borderWidth: 1.5,
    borderColor: "#40E0D0",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    backgroundColor: "#1C1C24",
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  cardText: { color: "white", fontSize: 15, flex: 1 },

  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#40E0D0",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#40E0D0",
  },

  input: {
    borderBottomWidth: 1.2,
    borderBottomColor: "#444",
    color: "white",
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 16,
  },

  cityItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.7,
    borderBottomColor: "#222",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCityItem: {
    backgroundColor: "#252530",
  },
  cityText: { color: "#ddd", fontSize: 16 },

  // Pre-loading on step 3
  preloadLoaderContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  preloadText: {
    color: "#40E0D0",
    fontSize: 16,
    marginTop: 16,
    fontWeight: "600",
  },
  preloadSubText: {
    color: "#888",
    fontSize: 13,
    marginTop: 6,
  },

  // Loader on step 4
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  loaderText: {
    color: "#40E0D0",
    fontSize: 18,
    marginTop: 16,
    fontWeight: "600",
  },

  // Error on step 4
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  errorText: {
    color: "#ff8888",
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  retryBtn: {
    backgroundColor: "#0056B3",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  noResultsText: {
    color: "#ffaa00",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },

  nextBtn: {
    position: "absolute",
    right: 24,
    bottom: 48,
    backgroundColor: "#0056B3",
    width: 70,
    height: 70,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  nextBtnDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PersonalLoanScreen;