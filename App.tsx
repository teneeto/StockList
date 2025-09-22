import React from 'react';
import { StatusBar } from 'react-native';
import StockListScreen from './src/screens/StockListScreen.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <StockListScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
