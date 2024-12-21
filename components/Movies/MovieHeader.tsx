import {
  View,
  Text,
  useWindowDimensions,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface props {
  poster: string;
  originalTitle: string;
  title: string;
}

const MovieHeader = ({ poster, originalTitle, title }: props) => {
  const { height } = useWindowDimensions();

  return (
    <>
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        start={[0, 0]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.4,
          zIndex: 5,
        }}
      />

      <View className="flex-1">
      <View
        style={{
          position: "absolute",
          zIndex: 99,
          elevation: 9,
          top: 30,
          left: 10,
        }}
      >
        <Pressable onPress={() => router.dismiss()}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="white"
            className="shadow"
          />
        </Pressable>
      </View>
      </View>
      <View className="flex flex-col gap-4">
        <View
          style={{ height: height * 0.7 }}
          className="shadow-xl shadow-black/20"
        >
          <View className="flex-1 bg-red-500 rounded-b-[25px] overflow-hidden">
            <Image
              source={{ uri: poster }}
              resizeMode="cover"
              className="flex-1"
            />
          </View>
        </View>
        <View className="px-5">
          <Text className="font-normal">{originalTitle}</Text>
          <Text className="font-semibold text-2xl">{title}</Text>
        </View>
      </View>
    </>
  );
};

export default MovieHeader;
