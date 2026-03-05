import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform ,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

import BusinessLoanScreen from "./BusinessLoanScreen";
import HomeLoanScreen from "./HomeLoanScreen";
import MachineryLoanScreen from "./MachineryLoan";
import LoanEMIScreen from "./LoanEMIScreen";
import SIPCalculatorScreen from "./SIPCalculatorScreen";

// 1. Reusable SideItem Component
const SideItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.sideItemRow}>
    <Icon name={icon} size={24} color="#ccc" />
    <Text style={styles.sideItemLabel}>{label}</Text>
  </TouchableOpacity>
);

// 2. Reusable Section Component

const Section = ({ title, items }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={styles.secTitle}>{title}</Text>
    <View style={styles.gridContainer}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gridItem}
          onPress={() => item.onPress && item.onPress()}   // ✅ YAHI MISSING THA
        >
          <View style={styles.gridIcon}>
            <Icon name={item.icon} size={30} color="#fff" />
          </View>
          <Text style={styles.gridLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


// 3. MAIN DASHBOARD SCREEN
const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Company Logo Strip */}
        <View style={styles.topLogoStrip}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.logoCenter}>
            <Text style={styles.companyName}>MONEY KING</Text>
            <Text style={styles.companySubName}>FINANCIAL SERVICES</Text>
          </View>
          <TouchableOpacity>
            <Icon name="bell-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {/* GIF Video Section */}
          <View style={styles.videoContainer}>
            <Image
              source={{
                uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJtZzZ5eXF6eXF6eXF6eXF6eXF6eXF6eXF6eXF6eXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxV9eqKMDM4/giphy.gif",
              }}
              style={styles.mainGif}
              resizeMode="cover"
            />
            <View style={styles.videoOverlay}>
              <Text style={styles.royaltySlogan}>ALWAYS ROYALTY</Text>
              <View style={styles.sloganLine} />
            </View>
          </View>

          {/* Content Sections */}
          <View style={styles.contentPadding}>
            <Section
              title="Trending Loans & Services"
              items={[
                { 
                  icon: "account", 
                  label: "Personal Loan", 
                  onPress: () => navigation.navigate('PersonalLoan')
                  
                },


                { 
                  icon: "briefcase", 
                  label: "Business Loan" , 
                  onPress: () => navigation.navigate('BusinessLoan') 
                },
                { icon: "home",
                   label: "Home Loan" ,  
                    onPress: () => navigation.navigate('HomeLoan') 
                  },

                { icon: "wrench",
                   label: "Machinery Loan",
                   onPress: () => navigation.navigate('MachineryLoan')
                },
                { icon: "finance", label: "Open a Demat A/c" },
                { icon: "credit-card",
                   label: "Credit Cards",
                   onPress: () => navigation.navigate('CreditCardScreen') 
                },
              ]}
            />

            <Section
              title="Insurance"
              items={[
                { icon: "shield-plus", label: "Life Insurance" },
                { icon: "heart-pulse", label: "Health Insurance" },
                { icon: "file-check", label: "Term Insurance" },
              ]}
            />

            <Section
              title="Calculators"
              items={[
                { icon: "calculator",
                   label: "EMI Calculator",
                   onPress: () => navigation.navigate('LoanEMIScreen')
                  },
                { icon: "chart-line", 
                  label: "SIP Calculator",
                   onPress: () => navigation.navigate('SIPCalculatorScreen')
                 },
              ]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// 4. SIDEBAR COMPONENT (Named Export)
export const SidebarContent = ({ navigation }) => (
  <View style={styles.sidebar}>
    <View style={styles.sideHeader}>
      <View style={styles.userIcon}>
        <Icon name="account" size={35} color="#fff" />
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.sideName}>Krishna</Text>
        <Text style={styles.sidePhone}>7521881896</Text>
      </View>
      <TouchableOpacity style={styles.profileBtn}>
        <Text style={{ color: "#4fd1c5", fontSize: 12 }}>Profile</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.sideMenu}>
      <SideItem icon="shield-check-outline" label="Privacy Policy" />
      <SideItem
        icon="file-document-edit-outline"
        label="Terms and Conditions"
      />
      <SideItem icon="help-circle-outline" label="FAQs" />
      <SideItem icon="logout" label="Logout" />
    </View>
    <Text style={styles.version}>Version: 1.2.0+11</Text>
  </View>
);

const styles = StyleSheet.create({
  // --- Main Containers ---
  mainWrapper: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  safeArea: { 
    flex: 1,
    // Android par status bar ki height jitna gap automatically add karega
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
  },

  // --- Header / Logo Strip ---
  topLogoStrip: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    // Agar content ab bhi touch ho raha hai toh yahan marginTop: 10 de sakte ho
  },
  logoCenter: { 
    alignItems: "center" 
  },
  companyName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  companySubName: { 
    color: "#fff", 
    fontSize: 9, 
    marginTop: -3 
  },

  // --- Banner / GIF Section ---
  videoContainer: { 
    height: 200, 
    width: "100%", 
    position: "relative" 
  },
  mainGif: { 
    width: "100%", 
    height: "100%", 
    opacity: 0.6 
  },
  videoOverlay: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  royaltySlogan: {
    color: "#4fd1c5",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  sloganLine: {
    height: 2,
    width: 100,
    backgroundColor: "#4fd1c5",
    marginTop: 5,
  },

  // --- Grid / Sections ---
  contentPadding: { 
    paddingHorizontal: 15, 
    paddingTop: 10 
  },
  secTitle: { 
    color: "#777", 
    fontSize: 14, 
    marginBottom: 12, 
    marginLeft: 5 
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 15,
    justifyContent: "flex-start",
  },
  gridItem: { 
    width: "33.33%", 
    alignItems: "center", 
    marginBottom: 20 
  },
  gridIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  gridLabel: { 
    color: "#fff", 
    fontSize: 10, 
    textAlign: "center", 
    marginTop: 8 
  },

  // --- Sidebar / Drawer Styling ---
  sidebar: { 
    flex: 1, 
    backgroundColor: "#151518", 
    padding: 25, 
    // Sidebar ke content ko bhi notch se bachane ke liye paddingTop diya hai
    paddingTop: Platform.OS === "ios" ? 60 : 40 
  },
  sideHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 40 
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4fd1c5",
    justifyContent: "center",
    alignItems: "center",
  },
  sideName: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  sidePhone: { 
    color: "#888", 
    fontSize: 14 
  },
  profileBtn: {
    marginLeft: "auto",
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  sideMenu: { 
    flex: 1 
  },
  sideItemRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 30 
  },
  sideItemLabel: { 
    color: "#ccc", 
    fontSize: 16, 
    marginLeft: 20 
  },

  // --- Footer / App Info ---
  version: {
    color: "#444",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default DashboardScreen;
