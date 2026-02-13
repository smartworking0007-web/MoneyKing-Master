// import React, { useState } from "react";
// import { 
//   StyleSheet, Text, View, TextInput, TouchableOpacity, 
//   SafeAreaView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
// } from "react-native";

// import { db } from "../config/firebaseConfig";
// import { doc, setDoc ,serverTimestamp } from "firebase/firestore";

// const RegistrationScreen = ({ navigation, route }) => {
//   // OTPScreen se uid aur mobile number le rahe hain
//   const { uid, mobile } = route.params;
  
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//   if (fullName.trim() === "") {
//     Alert.alert("Error", "Kripya apna pura naam daalein.");
//     return;
//   }

//   setLoading(true);
//   try {
//     // --- CORE FIX: Direct 'db' aur modular 'doc', 'setDoc' ka use ---
//     console.log("Registering user for UID:", uid);

//     await setDoc(doc(db, 'Users', uid), {
//       fullName: fullName.trim(),
//       phoneNumber: mobile,
//       createdAt: serverTimestamp(), // Best Practice: Server ka time use karein
//       uid: uid,
//       role: "User", // Default role dena acchi baat hai
//     });

//     console.log("User registered successfully in Firestore!");
    
//     // Dashboard par bhejein
//     navigation.replace("Dashboard");

//   } catch (error) {
//     console.error("Registration Error:", error);
    
//     // Detailed error message taaki pata chale issue kya hai
//     if (error.code === 'permission-denied') {
//       Alert.alert("Security Error", "Firestore rules check karein.");
//     } else {
//       Alert.alert("Error", "Registration fail ho gaya. Internet check karein.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        
//         <View style={styles.header}>
//           <Text style={styles.brandTitle}>MONEY KING</Text>
//           <Text style={styles.brandSubTitle}>FINANCIAL SERVICES</Text>
//           <View style={styles.line} />
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.title}>Welcome!</Text>
//           <Text style={styles.subtitle}>Kripya apna profile pura karein.</Text>
//         </View>

//         {/* Name Input */}
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Enter Full Name"
//           placeholderTextColor="#888"
//           value={fullName}
//           onChangeText={setFullName}
//         />

//         {/* Submit Button */}
//         <TouchableOpacity 
//           style={styles.registerButton} 
//           onPress={handleRegister} 
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#000" />
//           ) : (
//             <Text style={styles.registerButtonText}>SUBMIT</Text>
//           )}
//         </TouchableOpacity>

//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0D0D0D" },
//   content: { flex: 1, paddingHorizontal: 30, justifyContent: "center", alignItems: "center" },
//   header: { alignItems: "center", marginBottom: 50 },
//   brandTitle: { color: "#FFF", fontSize: 28, fontWeight: "900" },
//   brandSubTitle: { color: "#FFF", fontSize: 14 },
//   line: { height: 1, backgroundColor: "#FFF", width: 180, marginVertical: 10 },
//   textContainer: { width: "100%", marginBottom: 30 },
//   title: { color: "#FFF", fontSize: 28, fontWeight: "bold", textAlign: "center" },
//   subtitle: { color: "#888", fontSize: 16, textAlign: "center", marginTop: 10 },
//   inputStyle: {
//     backgroundColor: "#1A1A1A",
//     color: "#FFF",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#333",
//     marginBottom: 30,
//   },
//   registerButton: { 
//     backgroundColor: "#4fd1c5", 
//     width: "100%", 
//     paddingVertical: 16, 
//     borderRadius: 30, 
//     alignItems: "center" 
//   },
//   registerButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
// });

// export default RegistrationScreen;

// New Updaed Code  

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { db } from "../config/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const RegistrationScreen = ({ navigation, route }) => {
  // 📦 Receive UID & Mobile from OTP Screen
  const { uid, mobile } = route?.params || {};

  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // 🛑 Safety check
    if (!uid) {
      Alert.alert("Error", "Session expired. Please login again.");
      navigation.replace("Login");
      return;
    }

    // 📝 Validate name
    if (fullName.trim() === "") {
      Alert.alert("Error", "Kripya apna pura naam daalein.");
      return;
    }

    setLoading(true);

    try {
      console.log("Registering user UID:", uid);

      // 🔥 Save user data to Firestore
      await setDoc(doc(db, "users", uid), {
        fullName: fullName.trim(),
        phoneNumber: mobile || "",
        createdAt: serverTimestamp(), // ✅ Firebase server time
        uid: uid,
        role: "user", // lowercase recommended
      });

      console.log("User registered successfully!");

      // 🚀 Move to Dashboard
      navigation.replace("Dashboard");

    } catch (error) {
      console.log("Registration Error:", error.code, error.message);

      // 🎯 Specific Firestore errors
      if (error.code === "permission-denied") {
        Alert.alert("Security Error", "Firestore rules check karein.");
      } else if (error.code === "unavailable") {
        Alert.alert("Network Error", "Internet connection check karein.");
      } else {
        Alert.alert("Error", "Registration fail ho gaya.");
      }
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
        <View style={styles.header}>
          <Text style={styles.brandTitle}>MONEY KING</Text>
          <Text style={styles.brandSubTitle}>FINANCIAL SERVICES</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            Kripya apna profile pura karein.
          </Text>
        </View>

        {/* 🧑 Full Name Input */}
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
          editable={!loading}
        />

        {/* 🚀 Submit Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.registerButtonText}>SUBMIT</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", marginBottom: 50 },
  brandTitle: { color: "#FFF", fontSize: 28, fontWeight: "900" },
  brandSubTitle: { color: "#FFF", fontSize: 14 },
  line: { height: 1, backgroundColor: "#FFF", width: 180, marginVertical: 10 },
  textContainer: { width: "100%", marginBottom: 30 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { color: "#888", fontSize: 16, textAlign: "center", marginTop: 10 },
  inputStyle: {
    backgroundColor: "#1A1A1A",
    color: "#FFF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 30,
  },
  registerButton: { 
    backgroundColor: "#4fd1c5", 
    width: "100%", 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: "center" 
  },
  registerButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
});

export default RegistrationScreen ; 