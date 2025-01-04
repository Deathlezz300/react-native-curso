import ThemedView from "@/presentation/shared/ThemedView";
import { useRef } from "react";
import { View, Text, Animated, PanResponder } from "react-native";

const Animation102Screen = () => {
  const pant = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pant.x,
        dy: pant.y,
      },
    ],{
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pant, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <ThemedView margin className="flex-1 justify-center items-center">
      <Animated.View
        {...panResponder.panHandlers}
        style={{ ...pant.getLayout() }}
        className="bg-light-primary dark:bg-dark-primary rounded-md h-40 w-40"
      ></Animated.View>
    </ThemedView>
  );
};
export default Animation102Screen;
