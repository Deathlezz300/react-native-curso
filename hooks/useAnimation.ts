import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

interface params {
  startOpacity: number;
  finalOpacity: number;
  startPosition: number;
  finalPosition: number;
  opacityDuration?: number;
  positionDuration?: number;
  Easing?: number;
}

export const useAnimation = (animationValues: params) => {
  const animatedOpacity = useRef(
    new Animated.Value(animationValues.startOpacity)
  ).current;
  const animatedTop = useRef(
    new Animated.Value(animationValues.startPosition)
  ).current;

  const fadeIn = () => {
    const {
      opacityDuration = 300,
      positionDuration = 300,
      startPosition,
      finalOpacity,
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
      finalPosition,
      startOpacity,
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
