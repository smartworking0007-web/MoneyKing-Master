import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const BusinessLoanScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingCities, setLoadingCities] = useState(false);

  const [formData, setFormData] = useState({
    employmentType: '',
    loanAmount: '',
    annualTurnover: '',
    city: '',
    loanTenure: '',
    companyName: '',
    incorporationDate: new Date(),
    firmType: '',
    businessNature: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch Indian cities when needed (before step 4)
  const loadCities = async () => {
    if (cities.length > 0) return;

    setLoadingCities(true);
    try {
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: 'India' }),
      });
      const data = await res.json();

      if (!data.error && Array.isArray(data.data)) {
        setCities(data.data.sort());
      }
    } catch (err) {
      console.log('Cities fetch failed:', err);
    } finally {
      setLoadingCities(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({ ...formData, incorporationDate: selectedDate });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.title}>Employment Type</Text>
            {[
              { label: 'Self Employed Business', sub: 'Run a business' },
              { label: 'Self Employed Professional', sub: 'Doctor, C.A. Lawyer etc' },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.optionCard,
                  formData.employmentType === item.label && styles.selected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, employmentType: item.label });
                  setStep(2);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionText}>{item.label}</Text>
                  <Text style={styles.subText}>{item.sub}</Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    formData.employmentType === item.label && styles.radioActive,
                  ]}
                >
                  {formData.employmentType === item.label && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.title}>Loan Amount</Text>
            {[
              'Below ₹2 Lacs',
              '₹2 Lacs - ₹5 Lacs',
              '₹5 Lacs - ₹10 Lacs',
              '₹10 Lacs - ₹20 Lacs',
              'Above ₹20 Lacs',
            ].map((val) => (
              <TouchableOpacity
                key={val}
                style={[styles.optionCard, formData.loanAmount === val && styles.selected]}
                onPress={() => {
                  setFormData({ ...formData, loanAmount: val });
                  setStep(3);
                }}
              >
                <Text style={styles.optionText}>{val}</Text>
                <View
                  style={[styles.radio, formData.loanAmount === val && styles.radioActive]}
                >
                  {formData.loanAmount === val && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.title}>Gross Annual Turnover</Text>
            {[
              'Below ₹5 Lacs',
              '₹5 Lacs - ₹10 Lacs',
              '₹10 Lacs - ₹25 Lacs',
              '₹25 Lacs - ₹50 Lacs',
              '₹50 Lacs - ₹75 Lacs',
              '₹75 Lacs - ₹1 Core',
              'Over ₹1 Core',
            ].map((val) => (
              <TouchableOpacity
                key={val}
                style={[styles.optionCard, formData.annualTurnover === val && styles.selected]}
                onPress={() => {
                  setFormData({ ...formData, annualTurnover: val });
                  setStep(4);
                }}
              >
                <Text style={styles.optionText}>{val}</Text>
                <View
                  style={[styles.radio, formData.annualTurnover === val && styles.radioActive]}
                >
                  {formData.annualTurnover === val && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.title}>Current Residence City</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search city..."
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {loadingCities ? (
              <ActivityIndicator size="large" color="#40E0D0" style={{ marginTop: 40 }} />
            ) : (
              cities
                .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[styles.optionCard, formData.city === city && styles.selected]}
                    onPress={() => {
                      setFormData({ ...formData, city });
                      setStep(5);
                    }}
                  >
                    <Text style={styles.optionText}>{city}</Text>
                  </TouchableOpacity>
                ))
            )}
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={styles.title}>Loan Tenure & Company Details</Text>

            <Text style={styles.label}>Loan tenure in months</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.loanTenure}
              onChangeText={(v) => setFormData({ ...formData, loanTenure: v })}
            />

            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              value={formData.companyName}
              onChangeText={(v) => setFormData({ ...formData, companyName: v })}
            />

            <Text style={styles.label}>Date of Incorporation</Text>
            <TouchableOpacity
              style={styles.dateField}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {formData.incorporationDate.toLocaleDateString('en-IN')}
              </Text>
              <Ionicons name="calendar-outline" size={24} color="#40E0D0" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.incorporationDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>
        );

      case 6:
        return (
          <View>
            <Text style={styles.title}>Type of Firm</Text>
            {[
              'Private Limited',
              'Public Limited',
              'Proprietorship / Individual',
              'Partnership',
              'LLP (Limited Liability Partnership)',
              'HUF',
            ].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.optionCard, formData.firmType === type && styles.selected]}
                onPress={() => {
                  setFormData({ ...formData, firmType: type });
                  setStep(7);
                }}
              >
                <Text style={styles.optionText}>{type}</Text>
                <View
                  style={[styles.radio, formData.firmType === type && styles.radioActive]}
                >
                  {formData.firmType === type && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 7:
        return (
          <View>
            <Text style={styles.title}>Nature of Business</Text>
            {['Manufacturer', 'Trader', 'Service Provider', 'Whole Seller', 'Others'].map(
              (nature) => (
                <TouchableOpacity
                  key={nature}
                  style={[
                    styles.optionCard,
                    formData.businessNature === nature && styles.selected,
                  ]}
                  onPress={() => setFormData({ ...formData, businessNature: nature })}
                >
                  <Text style={styles.optionText}>{nature}</Text>
                  <View
                    style={[
                      styles.radio,
                      formData.businessNature === nature && styles.radioActive,
                    ]}
                  >
                    {formData.businessNature === nature && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              )
            )}

            <Text style={styles.privacyText}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Privacy Policy</Text> and{' '}
              <Text style={styles.link}>Terms of Service</Text>
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const handleSave = () => {
    console.log('Business Loan Data:', JSON.stringify(formData, null, 2));
    alert('Application submitted!\nCheck console for full data.');
    // ── Future Firebase integration point ──
    // addDoc(collection(db, "businessLoanApplications"), {
    //   ...formData,
    //   createdAt: serverTimestamp(),
    // });
    navigation.navigate('Dashboard'); // or wherever you want
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}>
          <Text style={styles.backText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Business Loan 💰</Text>
        <Text style={styles.stepCount}>Steps {step}/7</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${(step / 7) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={async () => {
          if (step === 3) await loadCities(); // preload cities before city screen
          if (step < 7) {
            setStep(step + 1);
          } else {
            handleSave();
          }
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f13' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backText: { color: '#40E0D0', fontSize: 16 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  stepCount: { color: '#888', fontSize: 13 },
  progressContainer: { height: 4, backgroundColor: '#222' },
  progressFill: { height: 4, backgroundColor: '#40E0D0' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  title: { color: '#ccc', fontSize: 16, marginBottom: 20, fontWeight: '600' },
  optionCard: {
    backgroundColor: '#1c1c24',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selected: { borderWidth: 1.5, borderColor: '#40E0D0', backgroundColor: '#252530' },
  optionText: { color: 'white', fontSize: 16 },
  subText: { color: '#888', fontSize: 13, marginTop: 4 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: { borderColor: '#40E0D0' },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#40E0D0' },
  label: { color: '#ccc', fontSize: 14, marginBottom: 8 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 24,
  },
  dateField: {
    backgroundColor: '#1c1c24',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateText: { color: 'white', fontSize: 16 },
  searchInput: {
    backgroundColor: '#1c1c24',
    color: 'white',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  privacyText: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 40 },
  link: { color: '#40E0D0' },
  actionButton: {
    position: 'absolute',
    right: 24,
    bottom: 40,
    backgroundColor: '#0056b3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default BusinessLoanScreen;