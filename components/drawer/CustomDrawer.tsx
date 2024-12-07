import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView { ...props }>
      <View className="flex flex-col gap-4 items-center mx-3 p-10 mb-10 rounded-xl bg-primary">
        <View className="flex justify-center items-center bg-white rounded-full h-24 w-24">
          <Text className="text-primary font-works-black text-3xl">AT</Text>
        </View>
      </View>

        <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
