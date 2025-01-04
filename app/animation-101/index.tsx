import { useAnimation } from "@/hooks/useAnimation";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedView from "@/presentation/shared/ThemedView";
import { useRef } from "react";
import { Animated, View, Easing } from "react-native";

const Animation101Screen = () => {
  const { fadeIn, fadeOut, animatedOpacity, animatedTop } = useAnimation({
    startPosition: 0,
    finalPosition: -100,
    startOpacity: 0,
    finalOpacity: 1,
    Easing: 1,
  });

  return (
    <ThemedView
      margin
      className="flex flex-col gap-6 justify-center items-center flex-1"
    >
      <Animated.View
        style={{
          opacity: animatedOpacity,
          transform: [
            {
              translateY: animatedTop,
            },
          ],
        }}
        className="bg-light-secondary dark:bg-dark-secondary h-40 w-40 rounded-lg"
      ></Animated.View>

      <ThemedButton onPress={fadeIn} text="FadeIn" />
      <ThemedButton onPress={fadeOut} text="FadeOut" />
    </ThemedView>
  );
};
export default Animation101Screen;
