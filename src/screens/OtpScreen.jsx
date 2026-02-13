// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// const OTPScreen = ({ navigation, route }) => {
//   // Login screen se bheja gaya mobile number lene ke liye
//   const { mobileNumber } = route?.params || { mobileNumber: "7521881896" };
//   const lastFour = mobileNumber.slice(-4);

//   // OTP State: 4 digits ke liye array
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputs = useRef([]);

//   // Ek box se dusre box par cursor le jane ka logic
//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   const handleBackspace = (index) => {
//     if (index > 0 && !otp[index]) {
//       inputs.current[index - 1].focus();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.content}
//       >
//         {/* Back Button */}
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backIcon}>←</Text>
//         </TouchableOpacity>

//         {/* Header Branding */}
//         <View style={styles.header}>
//           <Text style={styles.brandTitle}>MONEY KING</Text>
//           <Text style={styles.brandSubTitle}>FINANCIAL SERVICES</Text>
//           <View style={styles.line} />
//           <Text style={styles.tagline}>Always Royalty</Text>
//         </View>

//         {/* OTP Hero Image */}
//         <View style={styles.imageContainer}>
//           <Image
//             source={require("../../assets/images/NewLogo.png")}
//             style={styles.heroImage}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Verification Text */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>OTP Verification</Text>
//           <Text style={styles.subtitle}>
//             Enter the 4-digit code sent to ****{lastFour}
//           </Text>
//         </View>

//         {/* OTP Input Boxes (Functional) */}
//         <View style={styles.otpContainer}>
//           {otp.map((digit, index) => (
//             <View key={index} style={styles.otpInputBox}>
//               <TextInput
//                 ref={(ref) => (inputs.current[index] = ref)}
//                 style={[
//                   styles.inputStyle,
//                   digit ? styles.activeInput : styles.inactiveInput,
//                 ]}
//                 keyboardType="number-pad"
//                 maxLength={1}
//                 value={digit}
//                 onChangeText={(value) => handleOtpChange(value, index)}
//                 onKeyPress={({ nativeEvent }) => {
//                   if (nativeEvent.key === "Backspace") handleBackspace(index);
//                 }}
//               />
//               <View
//                 style={[
//                   styles.underline,
//                   digit ? styles.activeUnderline : null,
//                 ]}
//               />
//             </View>
//           ))}
//         </View>

//         {/* Resend OTP Link */}
//         <TouchableOpacity style={styles.resendContainer}>
//           <Text style={styles.resendText}>Resend OTP</Text>
//         </TouchableOpacity>

//         {/* Verify Button */}
//         <TouchableOpacity
//           style={styles.verifyButton}
//           onPress={() => alert("OTP Verified Successfully!")}
//         >
//           <Text style={styles.verifyButtonText}>VERIFY</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0D0D0D" },
//   backButton: { padding: 20, marginTop: 10 },
//   backIcon: { color: "#FFF", fontSize: 28 },
//   content: { flex: 1, paddingHorizontal: 30, alignItems: "center" },
//   header: { alignItems: "center", marginBottom: 20 },
//   brandTitle: { color: "#FFF", fontSize: 24, fontWeight: "900" },
//   brandSubTitle: { color: "#FFF", fontSize: 12, marginTop: -2 },
//   line: { height: 1, backgroundColor: "#FFF", width: 180, marginVertical: 5 },
//   tagline: { color: "#FFF", fontSize: 9, letterSpacing: 1 },
//   imageContainer: { marginBottom: 30 },
//   heroImage: { width: 150, height: 150, borderRadius: 25 },
//   textContainer: { width: "100%", alignItems: "center", marginBottom: 20 },
//   title: { color: "#FFF", fontSize: 26, fontWeight: "400" },
//   subtitle: { color: "#888", fontSize: 14, marginTop: 10 },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   otpInputBox: { width: "18%", alignItems: "center" },
//   inputStyle: {
//     color: "#FFF",
//     fontSize: 24,
//     textAlign: "center",
//     paddingBottom: 5,
//     width: "100%",
//   },
//   underline: { height: 2, backgroundColor: "#333", width: "100%" },
//   activeUnderline: { backgroundColor: "#00d1b2" },
//   resendContainer: { marginBottom: 40 },
//   resendText: { color: "#7B61FF", fontSize: 14 },
//   verifyButton: {
//     backgroundColor: "#4fd1c5",
//     width: "100%",
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   verifyButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
// });

// export default OTPScreen;

// import React, { useState, useRef, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import { db } from "../config/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// const OTPScreen = ({ navigation, route }) => {
//   const { mobileNumber, confirmation } = route?.params || {};

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const inputs = useRef([]);

//   // Captcha States
//   const [captchaModal, setCaptchaModal] = useState(false);
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [generatedCaptcha, setGeneratedCaptcha] = useState("");

//   const generateCaptcha = () => {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     setGeneratedCaptcha(code);
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleOtpChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleBackspace = (index) => {
//     if (index > 0 && !otp[index]) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const openSecurityCheck = () => {
//     const code = otp.join("").trim();

//     if (!confirmation) {
//       Alert.alert("Error", "Confirmation object missing. Restart login.");
//       return;
//     }

//     if (code.length !== 6) {
//       Alert.alert("Error", "Please enter 6-digit OTP.");
//       return;
//     }

//     setCaptchaModal(true);
//   };

//   const finalizeVerification = async () => {
//     if (captchaInput.toUpperCase() !== generatedCaptcha) {
//       Alert.alert("Invalid Code", "Security code incorrect.");
//       generateCaptcha();
//       return;
//     }

//     setCaptchaModal(false);
//     setLoading(true);

//     try {
//       const code = otp.join("").trim();
//       const userCredential = await confirmation.confirm(code);
//       const user = userCredential.user;

//       const userRef = doc(db, "Users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         navigation.replace("Dashboard");
//       } else {
//         navigation.replace("Registration", {
//           uid: user.uid,
//           mobile: mobileNumber,
//         });
//       }
//     } catch (error) {
//       console.log("OTP Error:", error);
//       Alert.alert("Verification Failed", "OTP invalid or expired.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.content}
//       >
//         <View style={styles.headerContainer}>
//           <Text style={styles.title}>OTP Verification</Text>
//           <Text style={styles.subtitle}>Sent to {mobileNumber}</Text>
//         </View>

//         <View style={styles.otpWrapper}>
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={(ref) => (inputs.current[index] = ref)}
//               style={styles.otpInput}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onChangeText={(v) => handleOtpChange(v, index)}
//               onKeyPress={({ nativeEvent }) => {
//                 if (nativeEvent.key === "Backspace") {
//                   handleBackspace(index);
//                 }
//               }}
//             />
//           ))}
//         </View>

//         <TouchableOpacity
//           style={styles.verifyButton}
//           onPress={openSecurityCheck}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#000" />
//           ) : (
//             <Text style={styles.verifyButtonText}>
//               VERIFY & CONTINUE
//             </Text>
//           )}
//         </TouchableOpacity>

//         {/* CAPTCHA MODAL */}
//         <Modal visible={captchaModal} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Security Check</Text>

//               <View style={styles.captchaDisplay}>
//                 <Text style={styles.captchaText}>
//                   {generatedCaptcha}
//                 </Text>
//               </View>

//               <TextInput
//                 style={styles.captchaInputBox}
//                 placeholder="Enter code"
//                 placeholderTextColor="#666"
//                 autoCapitalize="characters"
//                 value={captchaInput}
//                 onChangeText={setCaptchaInput}
//               />

//               <View style={styles.modalActions}>
//                 <TouchableOpacity
//                   onPress={() => setCaptchaModal(false)}
//                   style={styles.cancelBtn}
//                 >
//                   <Text style={{ color: "#888" }}>Cancel</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={finalizeVerification}
//                   style={styles.submitBtn}
//                 >
//                   <Text style={{ color: "#000", fontWeight: "bold" }}>
//                     Submit
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0D0D0D" },
//   content: { flex: 1, padding: 25, justifyContent: "center" },
//   headerContainer: { marginBottom: 40 },
//   title: { color: "#FFF", fontSize: 28, fontWeight: "bold" },
//   subtitle: { color: "#888", fontSize: 16, marginTop: 5 },

//   otpWrapper: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 30,
//   },

//   otpInput: {
//     backgroundColor: "#1A1A1A",
//     color: "#4fd1c5",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     width: "14%",
//     height: 55,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#333",
//   },

//   verifyButton: {
//     backgroundColor: "#4fd1c5",
//     paddingVertical: 18,
//     borderRadius: 15,
//     marginTop: 10,
//   },

//   verifyButtonText: {
//     color: "#000",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16,
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.85)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   modalContent: {
//     backgroundColor: "#1A1A1A",
//     width: "85%",
//     borderRadius: 20,
//     padding: 25,
//     alignItems: "center",
//   },

//   modalTitle: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },

//   captchaDisplay: {
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 20,
//   },

//   captchaText: {
//     color: "#4fd1c5",
//     fontSize: 28,
//     fontWeight: "900",
//     letterSpacing: 5,
//   },

//   captchaInputBox: {
//     width: "100%",
//     backgroundColor: "#000",
//     color: "#FFF",
//     borderRadius: 10,
//     padding: 15,
//     textAlign: "center",
//     fontSize: 18,
//     borderWidth: 1,
//     borderColor: "#4fd1c5",
//   },

//   modalActions: {
//     flexDirection: "row",
//     marginTop: 25,
//     width: "100%",
//     justifyContent: "space-between",
//   },

//   cancelBtn: { padding: 15, width: "45%", alignItems: "center" },

//   submitBtn: {
//     backgroundColor: "#4fd1c5",
//     padding: 15,
//     width: "45%",
//     borderRadius: 10,
//     alignItems: "center",
//   },
// });

// export default OTPScreen;


//  New Updated Code 



import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";

import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
 
const OTPScreen = ({ navigation, route }) => {
  const { mobileNumber, confirmation } = route?.params || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  // 🔐 Custom Captcha States
  const [captchaModal, setCaptchaModal] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  // 🎯 Generate Random Captcha
  const generateCaptcha = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 🔢 OTP Input Handler
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ⬅ Backspace Handler
  const handleBackspace = (index) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  // 🔍 Pre Verification Checks
  const openSecurityCheck = () => {
    const code = otp.join("").trim();

    if (!confirmation || typeof confirmation.confirm !== "function") {
      Alert.alert("Error", "Session expired. Please login again.");
      navigation.replace("Login");
      return;
    }

    if (code.length !== 6) {
      Alert.alert("Error", "Please enter 6-digit OTP.");
      return;
    }

    setCaptchaModal(true);
  };

  // ✅ Final Verification After Captcha
  const finalizeVerification = async () => {
    if (captchaInput.toUpperCase() !== generatedCaptcha) {
      Alert.alert("Invalid Code", "Security code incorrect.");
      generateCaptcha();
      return;
    }

    setCaptchaModal(false);
    setLoading(true);

    try {
      const code = otp.join("").trim();

      // 🔐 Verify OTP with Firebase
      const userCredential = await confirmation.confirm(code);
      const user = userCredential.user;

      // 📦 Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid); // recommended lowercase
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // 🔥 Existing User
        navigation.replace("Dashboard");
      } else {
        // 🆕 New User
        navigation.replace("Registration", {
          uid: user.uid,
          mobile: mobileNumber,
        });
      }

      // 🧹 Reset captcha input
      setCaptchaInput("");
      generateCaptcha();

    } catch (error) {
      console.log("OTP Error:", error.code, error.message);

      // 🎯 Specific Firebase error handling
      switch (error.code) {
        case "auth/invalid-verification-code":
          Alert.alert("Invalid OTP", "OTP galat hai.");
          break;

        case "auth/code-expired":
          Alert.alert("Expired", "OTP expire ho gaya. Dobara try karein.");
          break;

        default:
          Alert.alert("Verification Failed", "OTP invalid or expired.");
      }

      // 🧹 Clear OTP fields on failure
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>Sent to {mobileNumber}</Text>
        </View>

        <View style={styles.otpWrapper}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(v) => handleOtpChange(v, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={openSecurityCheck}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.verifyButtonText}>
              VERIFY & CONTINUE
            </Text>
          )}
        </TouchableOpacity>

        {/* 🔐 CAPTCHA MODAL */}
        <Modal visible={captchaModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Security Check</Text>

              <View style={styles.captchaDisplay}>
                <Text style={styles.captchaText}>
                  {generatedCaptcha}
                </Text>
              </View>

              <TextInput
                style={styles.captchaInputBox}
                placeholder="Enter code"
                placeholderTextColor="#666"
                autoCapitalize="characters"
                value={captchaInput}
                onChangeText={setCaptchaInput}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => setCaptchaModal(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={{ color: "#888" }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={finalizeVerification}
                  style={styles.submitBtn}
                >
                  <Text style={{ color: "#000", fontWeight: "bold" }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  content: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 16,
    marginTop: 5,
  },
  otpWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    backgroundColor: "#1A1A1A",
    color: "#4fd1c5",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "14%",
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  verifyButton: {
    backgroundColor: "#4fd1c5",
    paddingVertical: 18,
    borderRadius: 15,
    marginTop: 10,
  },
  verifyButtonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1A1A1A",
    width: "85%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  captchaDisplay: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  captchaText: {
    color: "#4fd1c5",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 5,
  },
  captchaInputBox: {
    width: "100%",
    backgroundColor: "#000",
    color: "#FFF",
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#4fd1c5",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 25,
    width: "100%",
    justifyContent: "space-between",
  },
  cancelBtn: {
    padding: 15,
    width: "45%",
    alignItems: "center",
  },
  submitBtn: {
    backgroundColor: "#4fd1c5",
    padding: 15,
    width: "45%",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default OTPScreen ; 