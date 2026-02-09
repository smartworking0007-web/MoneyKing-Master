import React, { useState, useRef } from "react";
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
} from "react-native";

const OTPScreen = ({ navigation, route }) => {
  // Login screen se bheja gaya mobile number lene ke liye
  const { mobileNumber } = route?.params || { mobileNumber: "7521881896" };
  const lastFour = mobileNumber.slice(-4);

  // OTP State: 4 digits ke liye array
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  // Ek box se dusre box par cursor le jane ka logic
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Header Branding */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>MONEY KING</Text>
          <Text style={styles.brandSubTitle}>FINANCIAL SERVICES</Text>
          <View style={styles.line} />
          <Text style={styles.tagline}>Always Royalty</Text>
        </View>

        {/* OTP Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/NewLogo.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Verification Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to ****{lastFour}
          </Text>
        </View>

        {/* OTP Input Boxes (Functional) */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpInputBox}>
              <TextInput
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.inputStyle,
                  digit ? styles.activeInput : styles.inactiveInput,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") handleBackspace(index);
                }}
              />
              <View
                style={[
                  styles.underline,
                  digit ? styles.activeUnderline : null,
                ]}
              />
            </View>
          ))}
        </View>

        {/* Resend OTP Link */}
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={() => alert("OTP Verified Successfully!")}
        >
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  backButton: { padding: 20, marginTop: 10 },
  backIcon: { color: "#FFF", fontSize: 28 },
  content: { flex: 1, paddingHorizontal: 30, alignItems: "center" },
  header: { alignItems: "center", marginBottom: 20 },
  brandTitle: { color: "#FFF", fontSize: 24, fontWeight: "900" },
  brandSubTitle: { color: "#FFF", fontSize: 12, marginTop: -2 },
  line: { height: 1, backgroundColor: "#FFF", width: 180, marginVertical: 5 },
  tagline: { color: "#FFF", fontSize: 9, letterSpacing: 1 },
  imageContainer: { marginBottom: 30 },
  heroImage: { width: 150, height: 150, borderRadius: 25 },
  textContainer: { width: "100%", alignItems: "center", marginBottom: 20 },
  title: { color: "#FFF", fontSize: 26, fontWeight: "400" },
  subtitle: { color: "#888", fontSize: 14, marginTop: 10 },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  otpInputBox: { width: "18%", alignItems: "center" },
  inputStyle: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 5,
    width: "100%",
  },
  underline: { height: 2, backgroundColor: "#333", width: "100%" },
  activeUnderline: { backgroundColor: "#00d1b2" },
  resendContainer: { marginBottom: 40 },
  resendText: { color: "#7B61FF", fontSize: 14 },
  verifyButton: {
    backgroundColor: "#4fd1c5",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  verifyButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
});

export default OTPScreen;
