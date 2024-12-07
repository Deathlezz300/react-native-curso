import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/shared/CustomButton";
import { Link, router } from "expo-router";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 mt-4 mx-6">
      <View className="w-full flex flex-col items-center gap-2">
        <Link href="/drawer/tabs/products" asChild>
          <CustomButton color="primary">Products</CustomButton>
        </Link>
        <Link href="/drawer/tabs/profile" asChild>
          <CustomButton color="secondary">Profile</CustomButton>
        </Link>
        <Link href="/drawer/tabs/settings" asChild>
          <CustomButton color="tertiary">Ajustes</CustomButton>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
