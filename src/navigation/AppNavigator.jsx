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
import { createDrawerNavigator } from '@react-navigation/drawer'; // Naya import
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OtpScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import DashboardScreen, { SidebarContent } from '../screens/DashboardScreen'; // SidebarContent bhi import karein

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// --- Drawer Navigation Logic ---
// Ye function Dashboard aur Sidebar ko handle karega

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <SidebarContent {...props} />} // Hamara Custom Sidebar
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
      
      {/* Yahan Dashboard ki jagah humne DrawerNavigator ko rakha hai */}
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;