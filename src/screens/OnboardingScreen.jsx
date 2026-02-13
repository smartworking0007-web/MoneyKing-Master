import React, { useState, useRef } from 'react';
import { 
  StyleSheet, View, Text, Image, FlatList, 
  Dimensions, TouchableOpacity, SafeAreaView 
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Ye data aapki screens ko define karta hai
const DATA = [
  {
    id: '1',
    title: 'One-stop solution for your financial needs',
    description: 'From loans to investments, find everything you need in one place',
    image: require('../../assets/images/onboarding11.png'), // File name check kar lein
  },
  {
    id: '2',
    title: 'Track your growth easily',
    description: 'Manage all your assets and liabilities in a single dashboard',
    image: require('../../assets/images/onboarding22.png'),
  },
  {
    id: '3',
    title: 'Secure and Reliable',
    description: 'Your data is encrypted and safe with our banking-grade security',
    image: require('../../assets/images/onboarding33.png'),
  },
];

const OnboardingScreen = ({ navigation }) => { // 1. navigation prop yahan add karein
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // 2. Navigation logic: Onboarding khatam hone par Login pe bhejein
      navigation.navigate('Login'); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Slider */}
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View 
            key={index} 
            style={[styles.dot, currentIndex === index ? styles.activeDot : null]} 
          />
        ))}
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === DATA.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0E13' }, // Dark background as per image
  slide: { width, alignItems: 'center', padding: 20, justifyContent: 'center' },
  image: { width: width * 0.8, height: height * 0.4, marginTop: 40 },
  textContainer: { marginTop: 40, alignItems: 'center' },
  title: { 
    fontSize: 24, fontWeight: 'bold', color: '#FFF', 
    textAlign: 'center', marginBottom: 15, paddingHorizontal: 20 
  },
  description: { 
    fontSize: 16, color: '#AAA', textAlign: 'center', 
    lineHeight: 24, paddingHorizontal: 30 
  },
  pagination: { 
    flexDirection: 'row', justifyContent: 'center', marginBottom: 40 
  },
  dot: { 
    height: 8, width: 8, borderRadius: 4, 
    backgroundColor: '#333', marginHorizontal: 5 
  },
  activeDot: { backgroundColor: '#4FD1C5', width: 20 }, // Teal color from image
  footer: { paddingHorizontal: 20, marginBottom: 30 },
  button: { 
    backgroundColor: '#4FD1C5', paddingVertical: 15, 
    borderRadius: 30, alignItems: 'center' 
  },
  buttonText: { color: '#0F0E13', fontSize: 18, fontWeight: 'bold' },
});

export default OnboardingScreen;


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
//   const { mobileNumber, confirm } = route?.params || {};
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const inputs = useRef([]);

//   // --- Captcha Modal States ---
//   const [captchaModal, setCaptchaModal] = useState(false);
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [generatedCaptcha, setGeneratedCaptcha] = useState("");

//   // Function to generate random security code
//   const generateCaptcha = () => {
//     const code = Math.random().toString(36).substring(2, 7).toUpperCase();
//     setGeneratedCaptcha(code);
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) inputs.current[index + 1].focus();
//   };

//   const handleBackspace = (index) => {
//     if (index > 0 && !otp[index]) inputs.current[index - 1].focus();
//   };

//   // Step 1: Triggered when "VERIFY" is clicked
//   const openSecurityCheck = () => {
//     const code = otp.join("").trim();
//     if (code.length !== 6)
//       return Alert.alert("Error", "Kripya 6-digit OTP daalein.");
//     setCaptchaModal(true);
//   };

//   // Step 2: Final Verification after Captcha
//   const finalizeVerification = async () => {
//     if (captchaInput.toUpperCase() !== generatedCaptcha) {
//       Alert.alert("Invalid Code", "Security code galat hai.");
//       generateCaptcha();
//       return;
//     }

//     setCaptchaModal(false);
//     setLoading(true);
//     const code = otp.join("").trim();

//     try {
//       const userCredential = await confirm.confirm(code);
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
//       console.log(error);
//       Alert.alert(
//         "Verification Failed",
//         "OTP galat hai ya expire ho gaya hai.",
//       );
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

//         {/* OTP Inputs */}
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
//                 if (nativeEvent.key === "Backspace") handleBackspace(index);
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
//             <Text style={styles.verifyButtonText}>VERIFY & CONTINUE</Text>
//           )}
//         </TouchableOpacity>

//         {/* --- SECURITY CAPTCHA MODAL --- */}
//         <Modal visible={captchaModal} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Security Check</Text>
//               <View style={styles.captchaDisplay}>
//                 <Text style={styles.captchaText}>{generatedCaptcha}</Text>
//                 <TouchableOpacity onPress={generateCaptcha}>
//                   <Text style={{ fontSize: 20, marginLeft: 10 }}>🔄</Text>
//                 </TouchableOpacity>
//               </View>
//               <TextInput
//                 style={styles.captchaInputBox}
//                 placeholder="Enter the code above"
//                 placeholderTextColor="#666"
//                 autoCapitalize="characters"
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

//   // Modal Styles
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
//     flexDirection: "row",
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   captchaText: {
//     color: "#4fd1c5",
//     fontSize: 28,
//     fontWeight: "900",
//     letterSpacing: 5,
//     fontStyle: "italic",
//     textDecorationLine: "line-through",
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

// export default OnboardingScreen;
