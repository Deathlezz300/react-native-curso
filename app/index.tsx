import { View, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import ThemeText from "@/components/ThemeText";
import CalculatorButton from "@/components/CalculatorButton";
import ButtonsData from "@/constants/ButtonsData";

const CalculatorApp = () => {
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={styles.resultContainer}>
        <ThemeText variant="primary">50 + 70</ThemeText>
        <ThemeText variant="secondary">20</ThemeText>
      </View>
      <View style={styles.buttonsContainer}>
        {ButtonsData.map((button) => (
          <CalculatorButton
            key={button.label}
            label={button.label}
            variant={button.variant}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexWrap: "wrap",
  },
});

export default CalculatorApp;
