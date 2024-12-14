import { View, Text, Platform } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface props {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:3000,
      retry:3,
      retryDelay:1000
    }
  }
});

const ExternalProviders = ({ children }: props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {Platform.OS === "web" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default ExternalProviders;
