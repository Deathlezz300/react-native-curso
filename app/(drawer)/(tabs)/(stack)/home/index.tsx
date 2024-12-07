import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/shared/CustomButton";
import { Link, router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const onToogleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView className="flex-1 mt-4 mx-6">
      <View className="w-full flex flex-col items-center gap-2">
        <Link href="/products" asChild>
          <CustomButton color="primary">Products</CustomButton>
        </Link>
        <Link href="/profile" asChild>
          <CustomButton color="secondary">Profile</CustomButton>
        </Link>
        <Link href="/settings" asChild>
          <CustomButton color="tertiary">Ajustes</CustomButton>
        </Link>
        <CustomButton color="primary" onPress={onToogleDrawer}>
          Abrir menu
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
