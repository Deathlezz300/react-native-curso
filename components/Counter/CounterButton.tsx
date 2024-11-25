import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

interface props {
  functionAction: () => void;
  label: string;
  reset?: () => void;
}

export default function CounterButton({ functionAction, label, reset }: props) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.buttonCounterStyle,
          pressed && styles.pressedStyle,
        ]}
        onLongPress={reset ? reset : () => ""}
        onPress={functionAction}
      >
        <Text style={styles.textButton}>{label}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  buttonCounterStyle: {
    backgroundColor: "#000000",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  textButton: {
    color: "#ffffff",
    padding: 15,
    paddingRight: 60,
    paddingLeft: 60,
    fontSize: 20,
    fontWeight: "bold",
  },

  pressedStyle: {
    opacity: 0.7,
  },
});
