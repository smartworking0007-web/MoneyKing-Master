import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* Light status bar kyunki background dark hai */}
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}