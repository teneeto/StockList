import React from 'react';
import { StatusBar } from 'react-native';
import StockListScreen from './src/screens/StockListScreen.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <StockListScreen />
    </SafeAreaProvider>
  );
}
