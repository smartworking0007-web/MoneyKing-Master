import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  // OTP bhejane aur navigate karne ka logic
  const handleGetOTP = () => {
    if (phoneNumber.length === 10) {
      Alert.alert(
        "OTP Sent", 
        "A 4-digit code has been sent to your mobile number.",
        [
          { 
            text: "OK", 
            onPress: () => navigation.navigate('OTPVerification', { mobileNumber: phoneNumber }) 
          }
        ]
      );
    } else {
      Alert.alert("Invalid Number", "Please enter a 10-digit mobile number.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.content}
      >
        {/* Logo Section */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/MoneyKing.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Always Royalty </Text>
        </View>

        {/* Hero Illustration */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/NewLogo.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login with Mobile Number</Text>
          <Text style={styles.subtitle}>
            We will send you a one-time OTP to this mobile number
          </Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Enter your Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder=" xxx-xxx-xxxx"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleGetOTP}
          >
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>

          {/* Footer Links */}
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Privacy Policy</Text> and{' '}
            <Text style={styles.link}>Terms of Service</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 50,
    borderRadius: 20
  },
  tagline: {
    color: '#FFF',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: -5,
  },
  imageContainer: {
    marginVertical: 40,
  },
  heroImage: {
    width: 150,
    height: 150,
    borderRadius: 20
  },
  formContainer: {
    width: '100%',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#BBB',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 30,
  },
  inputLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    color: '#00d1b2',
    fontSize: 20,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#4fd1c5',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#4fd1c5',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;