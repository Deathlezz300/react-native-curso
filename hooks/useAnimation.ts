import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

interface params {
  startOpacity?: number;
  finalOpacity?: number;
  startPosition?: number;
  finalPosition?: number;
  opacityDuration?: number;
  positionDuration?: number;
  Easing?: number;
}

const baseValues = {
  startPosition: 0,
  finalPosition: -100,
  startOpacity: 0,
  finalOpacity: 1,
  Easing: 1,
  opacityDuration: 300,
  positionDuration: 300,
};

export const useAnimation = (animationValues = baseValues) => {
  const animatedOpacity = useRef(
    new Animated.Value(animationValues.startOpacity ?? 0)
  ).current;
  const animatedTop = useRef(
    new Animated.Value(animationValues.startPosition ?? 0)
  ).current;

  const fadeIn = () => {
    const {
      opacityDuration = 300,
      positionDuration = 300,
      startPosition = 0,
      finalOpacity = 1,
    } = animationValues;

    Animated.timing(animatedOpacity, {
      toValue: finalOpacity,
      duration: opacityDuration,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedTop, {
      toValue: startPosition,
      duration: positionDuration,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start();
  };

  const fadeOut = () => {
    const {
      opacityDuration = 300,
      positionDuration = 300,
      finalPosition = -100,
      startOpacity = 0,
    } = animationValues;
    Animated.timing(animatedOpacity, {
      toValue: startOpacity,
      duration: opacityDuration,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedTop, {
      toValue: finalPosition,
      duration: positionDuration,
      useNativeDriver: true,
    }).start();
  };

  return {
    fadeIn,
    fadeOut,
    animatedOpacity,
    animatedTop,
  };
};
