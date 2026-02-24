// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen'; // Ek dummy LoginScreen banani hogi
// import OTPScreen from '../screens/OtpScreen';
// import RegistrationScreen from '../screens/RegistrationScreen'; // Nayi file
// import DashboardScreen from '../screens/DashboardScreen';       // Nayi file

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="OTPVerification" component={OTPScreen} />
//       <Stack.Screen name="Registration" component={RegistrationScreen} />
//       <Stack.Screen name="Dashboard" component={DashboardScreen} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OtpScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import DashboardScreen, { SidebarContent } from '../screens/DashboardScreen';
// 1. PersonalLoanScreen ko import karein (Path check kar lein)
import PersonalLoanScreen from '../screens/PersonalLoanScreen'; 
import BusinessLoanScreen from '../screens/BusinessLoanScreen';
import HomeLoanScreen from '../screens/HomeLoanScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// --- Drawer Navigation Logic ---
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <SidebarContent {...props} />} 
      screenOptions={{ 
        headerShown: false, 
        drawerStyle: { width: '80%', backgroundColor: '#151518' } 
      }}
    >
      <Drawer.Screen name="DashboardMain" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

// --- Main App Navigation ---
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      
      {/* Dashboard with Sidebar */}
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />

      {/* 2. Personal Loan Screen ko Stack mein add kiya 
          Iska matlab hai ki ye Dashboard ke upar khulega aur isme sidebar nahi dikhega.
          Iska name 'PersonalLoan' rakha hai jise navigation.navigate mein use karenge. */}
      
          <Stack.Screen name="PersonalLoan" component={PersonalLoanScreen} />
          <Stack.Screen name="BusinessLoan" component={BusinessLoanScreen} />
          <Stack.Screen name="HomeLoan" component={HomeLoanScreen} />
          
    </Stack.Navigator>
  );
};

export default AppNavigator;