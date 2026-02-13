// import React, { useState } from "react";
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
//   Alert,
//   ActivityIndicator, // Naya import loading ke liye
// } from "react-native";
// import auth from "@react-native-firebase/auth"; // Firebase Auth import

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state

//   // // Firebase OTP Logic
//   // const handleGetOTP = async () => {
//   //   if (phoneNumber.length === 10) {
//   //     setLoading(true);
//   //     try {
//   //       // India ke liye +91 lagana zaruri hai
//   //       const formatPhone = `+91${phoneNumber}`;

//   //       // Firebase se OTP request
//   //       const confirmation = await auth().signInWithPhoneNumber(formatPhone);

//   //       setLoading(false);

//   // Firebase OTP Logic
// // Firebase OTP Logic
// const handleGetOTP = async () => {
//   if (phoneNumber.length === 10) {
//     setLoading(true);

//     // Kisi bhi space ya unwanted character ko hatane ke liye trim aur replace
//     const cleanNumber = phoneNumber.trim().replace(/\s+/g, '');
//     const formatPhone = `+91${cleanNumber}`;

//     // --- LOGS FOR DEBUGGING ---
//     console.log("------------------------------------");
//     console.log("SENDING OTP TO:", formatPhone);
//     console.log("PHONE LENGTH:", formatPhone.length);
//     console.log("------------------------------------");

//     try {
//       // Firebase se OTP request
//       const confirmation = await auth().signInWithPhoneNumber(formatPhone);

//       // --- LOG SUCCESS ---
//       console.log("OTP SENT SUCCESSFULLY!");
//       console.log("CONFIRMATION OBJECT RECEIVED:", !!confirmation);

//       setLoading(false);

//       // OTPScreen par navigate karein aur confirm object pass karein
//       navigation.navigate("OTPVerification", {
//         mobileNumber: formatPhone,
//         confirm: confirmation
//       });

//     } catch (error) {
//       setLoading(false);

//       // --- LOG ERROR ---
//       console.error("FIREBASE LOGIN ERROR:", error.code, error.message);

//       if (error.code === 'auth/invalid-phone-number') {
//         Alert.alert("Error", "Phone number sahi nahi hai.");
//       } else if (error.code === 'auth/too-many-requests') {
//         Alert.alert("Error", "Bahut zyada koshish ki gayi hai. Thodi der baad try karein.");
//       } else {
//         Alert.alert("Error", "OTP nahi bheja ja saka. Check karein internet aur Firebase setup.");
//       }
//     }
//   } else {
//     Alert.alert("Invalid Number", "Kripya 10 digit ka mobile number daalein.");
//   }
// };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.content}
//       >
//         <View style={styles.header}>
//           <Image
//             source={require("../../assets/images/MoneyKing.jpeg")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.tagline}>Always Royalty </Text>
//         </View>

//         <View style={styles.imageContainer}>
//           <Image
//             source={require("../../assets/images/NewLogo.png")}
//             style={styles.heroImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Login with Mobile Number</Text>
//           <Text style={styles.subtitle}>
//             We will send you a one-time OTP to this mobile number
//           </Text>

//           <View style={styles.inputWrapper}>
//             <Text style={styles.inputLabel}>Enter your Mobile Number</Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text
//                 style={{ color: "#00d1b2", fontSize: 20, paddingBottom: 2 }}
//               >
//                 +91{" "}
//               </Text>
//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 placeholder="xxx-xxx-xxxx"
//                 placeholderTextColor="#666"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 editable={!loading} // Loading ke waqt input band
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
//             onPress={handleGetOTP}
//             disabled={loading} // Double click rokne ke liye
//           >
//             {loading ? (
//               <ActivityIndicator color="#121212" />
//             ) : (
//               <Text style={styles.buttonText}>Get OTP</Text>
//             )}
//           </TouchableOpacity>

//           <Text style={styles.footerText}>
//             By continuing, you agree to our{" "}
//             <Text style={styles.link}>Privacy Policy</Text> and{" "}
//             <Text style={styles.link}>Terms of Service</Text>
//           </Text>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// // Styles wahi hain jo aapne diye the
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#121212" },
//   content: {
//     flex: 1,
//     paddingHorizontal: 25,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: { alignItems: "center", marginTop: 40 },
//   logo: { width: 200, height: 50, borderRadius: 20 },
//   tagline: { color: "#FFF", fontSize: 10, letterSpacing: 2, marginTop: -5 },
//   imageContainer: { marginVertical: 40 },
//   heroImage: { width: 150, height: 150, borderRadius: 20 },
//   formContainer: { width: "100%" },
//   title: {
//     color: "#FFF",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: "#BBB",
//     fontSize: 14,
//     textAlign: "center",
//     lineHeight: 20,
//     marginBottom: 40,
//   },
//   inputWrapper: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#333",
//     marginBottom: 30,
//   },
//   inputLabel: { color: "#888", fontSize: 12, marginBottom: 5 },
//   input: {
//     color: "#00d1b2",
//     fontSize: 20,
//     paddingVertical: 10,
//     letterSpacing: 1,
//   },
//   button: {
//     backgroundColor: "#4fd1c5",
//     borderRadius: 30,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   buttonText: { color: "#121212", fontSize: 18, fontWeight: "600" },
//   footerText: {
//     color: "#888",
//     fontSize: 12,
//     textAlign: "center",
//     lineHeight: 18,
//   },
//   link: { color: "#4fd1c5", textDecorationLine: "underline" },
// });

// export default LoginScreen;

// import React, { useState } from "react";
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
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// import { auth } from "../config/firebaseConfig";
// import { signInWithPhoneNumber } from "firebase/auth";

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGetOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert(
//         "Invalid Number",
//         "Kripya 10 digit ka mobile number daalein."
//       );
//       return;
//     }

//     setLoading(true);
//     const formatPhone = `+91${phoneNumber.trim()}`;

//     try {
//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         formatPhone
//       );

//       setLoading(false);

//       navigation.navigate("OTPVerification", {
//         mobileNumber: formatPhone,
//         confirmation: confirmation,
//       });

//     } catch (error) {
//       setLoading(false);
//       console.error("FIREBASE ERROR:", error.code);

//       if (error.code === "auth/invalid-phone-number") {
//         Alert.alert("Error", "Phone number sahi nahi hai.");
//       } else if (error.code === "auth/too-many-requests") {
//         Alert.alert("Error", "Limit hit! Thodi der baad try karein.");
//       } else {
//         Alert.alert(
//           "Error",
//           "Phone Auth enable hai ya nahi Firebase Console me check karein."
//         );
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.content}
//       >
//         <View style={styles.header}>
//           <Image
//             source={require("../../assets/images/MoneyKing.jpeg")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.tagline}>Always Royalty </Text>
//         </View>

//         <View style={styles.imageContainer}>
//           <Image
//             source={require("../../assets/images/NewLogo.png")}
//             style={styles.heroImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Login with Mobile Number</Text>
//           <Text style={styles.subtitle}>
//             We will send you a one-time OTP to this mobile number
//           </Text>

//           <View style={styles.inputWrapper}>
//             <Text style={styles.inputLabel}>
//               Enter your Mobile Number
//             </Text>

//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text
//                 style={{
//                   color: "#4fd1c5",
//                   fontSize: 20,
//                   fontWeight: "bold",
//                 }}
//               >
//                 +91{" "}
//               </Text>

//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 placeholder="00000 00000"
//                 placeholderTextColor="#666"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 editable={!loading}
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
//             onPress={handleGetOTP}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#0D0D0D" />
//             ) : (
//               <Text style={styles.buttonText}>Get OTP</Text>
//             )}
//           </TouchableOpacity>

//           <Text style={styles.footerText}>
//             By continuing, you agree to our{" "}
//             <Text style={styles.link}>Privacy Policy</Text> and{" "}
//             <Text style={styles.link}>Terms of Service</Text>
//           </Text>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0D0D0D" },
//   content: {
//     flex: 1,
//     paddingHorizontal: 25,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: { alignItems: "center", marginTop: 20 },
//   logo: { width: 180, height: 60, borderRadius: 15 },
//   tagline: {
//     color: "#FFF",
//     fontSize: 10,
//     letterSpacing: 3,
//     marginTop: 5,
//     opacity: 0.8,
//   },
//   imageContainer: { marginVertical: 30 },
//   heroImage: { width: 140, height: 140, borderRadius: 25 },
//   formContainer: { width: "100%" },
//   title: {
//     color: "#FFF",
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: "#888",
//     fontSize: 13,
//     textAlign: "center",
//     marginBottom: 35,
//   },
//   inputWrapper: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: "#333",
//     marginBottom: 35,
//     paddingBottom: 5,
//   },
//   inputLabel: {
//     color: "#666",
//     fontSize: 12,
//     marginBottom: 8,
//     fontWeight: "600",
//   },
//   input: { color: "#FFF", fontSize: 22, letterSpacing: 2 },
//   button: {
//     backgroundColor: "#4fd1c5",
//     borderRadius: 15,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 5,
//   },
//   buttonText: { color: "#0D0D0D", fontSize: 18, fontWeight: "700" },
//   footerText: {
//     color: "#555",
//     fontSize: 11,
//     textAlign: "center",
//     lineHeight: 18,
//   },
//   link: { color: "#4fd1c5", fontWeight: "bold" },
// });

// export default LoginScreen;



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
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// // --- FIXED MOBILE IMPORTS ---

// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { auth } from "../config/firebaseConfig";
// import { signInWithPhoneNumber } from "firebase/auth";

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   // --- MOBILE FIX: Ref for Recaptcha Modal ---
//   const recaptchaVerifier = useRef(null);

//   const handleGetOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert(
//         "Invalid Number",
//         "Kripya 10 digit ka mobile number daalein.",
//       );
//       return;
//     }

//     setLoading(true);
//     const formatPhone = `+91${phoneNumber.trim()}`;

//     try {
//       // --- CORE FIX: Using the Modal Ref instead of new RecaptchaVerifier ---
//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         formatPhone,
//         recaptchaVerifier.current,
//       );

//       setLoading(false);

//       // Navigate to OTP Screen with confirmation object
//       navigation.navigate("OTPVerification", {
//         mobileNumber: formatPhone,
//         confirm: confirmation,
//       });
//     } catch (error) {
//       setLoading(false);
//       console.error("FIREBASE ERROR:", error.code);

//       if (error.code === "auth/invalid-phone-number") {
//         Alert.alert("Error", "Phone number sahi nahi hai.");
//       } else if (error.code === "auth/too-many-requests") {
//         Alert.alert("Error", "Limit hit! Thodi der baad try karein.");
//       } else {
//         Alert.alert(
//           "Error",
//           "Auth setup issue. Make sure Phone Auth is enabled in Firebase.",
//         );
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* --- RECAPTCHA FIX: This hidden modal prevents the 'prototype' crash --- */}
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={auth.app.options}
//         attemptInvisibleVerification={false}
//       />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.content}
//       >
//         <View style={styles.header}>
//           <Image
//             source={require("../../assets/images/MoneyKing.jpeg")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.tagline}>Always Royalty </Text>
//         </View>

//         <View style={styles.imageContainer}>
//           <Image
//             source={require("../../assets/images/NewLogo.png")}
//             style={styles.heroImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Login with Mobile Number</Text>
//           <Text style={styles.subtitle}>
//             We will send you a one-time OTP to this mobile number
//           </Text>

//           <View style={styles.inputWrapper}>
//             <Text style={styles.inputLabel}>Enter your Mobile Number</Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text
//                 style={{ color: "#4fd1c5", fontSize: 20, fontWeight: "bold" }}
//               >
//                 +91{" "}
//               </Text>
//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 placeholder="00000 00000"
//                 placeholderTextColor="#666"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 editable={!loading}
//               />
//             </View>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
//             onPress={handleGetOTP}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#0D0D0D" />
//             ) : (
//               <Text style={styles.buttonText}>Get OTP</Text>
//             )}
//           </TouchableOpacity>

//           <Text style={styles.footerText}>
//             By continuing, you agree to our{" "}
//             <Text style={styles.link}>Privacy Policy</Text> and{" "}
//             <Text style={styles.link}>Terms of Service</Text>
//           </Text>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0D0D0D" },
//   content: {
//     flex: 1,
//     paddingHorizontal: 25,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: { alignItems: "center", marginTop: 20 },
//   logo: { width: 180, height: 60, borderRadius: 15 },
//   tagline: {
//     color: "#FFF",
//     fontSize: 10,
//     letterSpacing: 3,
//     marginTop: 5,
//     opacity: 0.8,
//   },
//   imageContainer: { marginVertical: 30 },
//   heroImage: { width: 140, height: 140, borderRadius: 25 },
//   formContainer: { width: "100%" },
//   title: {
//     color: "#FFF",
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: "#888",
//     fontSize: 13,
//     textAlign: "center",
//     marginBottom: 35,
//   },
//   inputWrapper: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: "#333",
//     marginBottom: 35,
//     paddingBottom: 5,
//   },
//   inputLabel: {
//     color: "#666",
//     fontSize: 12,
//     marginBottom: 8,
//     fontWeight: "600",
//   },
//   input: { color: "#FFF", fontSize: 22, letterSpacing: 2 },
//   button: {
//     backgroundColor: "#4fd1c5",
//     borderRadius: 15,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 5,
//   },
//   buttonText: { color: "#0D0D0D", fontSize: 18, fontWeight: "700" },
//   footerText: {
//     color: "#555",
//     fontSize: 11,
//     textAlign: "center",
//     lineHeight: 18,
//   },
//   link: { color: "#4fd1c5", fontWeight: "bold" },
// });

// export default LoginScreen;


//   New Updated Code

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
  Alert,
  ActivityIndicator,
} from "react-native";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../config/firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Reference for reCAPTCHA modal (Required for Expo Go)
  const recaptchaVerifier = useRef(null);

  const handleGetOTP = async () => {
    // 🧹 Remove spaces & trim input
    const cleanedNumber = phoneNumber.replace(/\s/g, "").trim();

    // 📵 Validate Indian 10 digit number
    if (cleanedNumber.length !== 10) {
      Alert.alert("Invalid Number", "Kripya 10 digit ka mobile number daalein.");
      return;
    }

    // 🚫 Prevent action if recaptcha not ready
    if (!recaptchaVerifier.current) {
      Alert.alert("Error", "Recaptcha not ready. Please try again.");
      return;
    }

    setLoading(true);

    // 🇮🇳 Add country code
    const formattedPhone = `+91${cleanedNumber}`;

    try {
      // 📲 Send OTP using Firebase Phone Auth
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifier.current
      );

      // 🔄 Stop loader
      setLoading(false);

      // 🚀 Navigate to OTP screen with confirmation object
      navigation.navigate("OTPVerification", {
        mobileNumber: formattedPhone,
        confirmation: confirmation, // renamed from "confirm" for clarity
      });

    } catch (error) {
      console.log("FIREBASE ERROR:", error.code, error.message);

      // 🔄 Ensure loader stops even if error
      setLoading(false);

      // 🎯 Handle common Firebase errors
      switch (error.code) {
        case "auth/invalid-phone-number":
          Alert.alert("Error", "Phone number sahi nahi hai.");
          break;

        case "auth/too-many-requests":
          Alert.alert("Error", "Limit hit! Thodi der baad try karein.");
          break;

        case "auth/network-request-failed":
          Alert.alert("Network Error", "Internet connection check karein.");
          break;

        default:
          Alert.alert(
            "Error",
            "Auth setup issue. Make sure Phone Auth enabled in Firebase."
          );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔐 Required Recaptcha Modal for Expo Go */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/MoneyKing.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Always Royalty </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/NewLogo.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login with Mobile Number</Text>
          <Text style={styles.subtitle}>
            We will send you a one-time OTP to this mobile number
          </Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              Enter your Mobile Number
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#4fd1c5",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                +91{" "}
              </Text>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="00000 00000"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!loading}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleGetOTP}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0D0D0D" />
            ) : (
              <Text style={styles.buttonText}>Get OTP</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text style={styles.link}>Privacy Policy</Text> and{" "}
            <Text style={styles.link}>Terms of Service</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  header: { alignItems: "center", marginTop: 20 },
  logo: { width: 180, height: 60, borderRadius: 15 },
  tagline: {
    color: "#FFF",
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 5,
    opacity: 0.8,
  },
  imageContainer: { marginVertical: 30 },
  heroImage: { width: 140, height: 140, borderRadius: 25 },
  formContainer: { width: "100%" },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 35,
  },
  inputWrapper: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#333",
    marginBottom: 35,
    paddingBottom: 5,
  },
  inputLabel: {
    color: "#666",
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: { color: "#FFF", fontSize: 22, letterSpacing: 2 },
  button: {
    backgroundColor: "#4fd1c5",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: { color: "#0D0D0D", fontSize: 18, fontWeight: "700" },
  footerText: {
    color: "#555",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 18,
  },
  link: { color: "#4fd1c5", fontWeight: "bold" },
});

export default LoginScreen ;