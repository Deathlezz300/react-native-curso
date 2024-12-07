import { View, Text } from "react-native";
import React from "react";
import { router, Stack, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const StackLayout = () => {
  
  
  const navigation=useNavigation();

  const onHeaderLeftClick=(canGoBack:boolean)=>{
    if(canGoBack){
      router.back();
    }else{
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  }

  
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "fade",
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
        headerLeft : ( { tintColor , canGoBack } )=> <Ionicons
         name={ canGoBack ? "arrow-back-outline" : "grid-outline" }
         size={20}
         color={tintColor}
         className="mr-5"
         onPress={()=>onHeaderLeftClick(!!canGoBack)}
        />
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="products/index"
        options={{
          title: "Products",
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          title: "Settings",
        }}
      />

      <Stack.Screen
        name="products/[id]"
        options={{
          title: "Product",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
