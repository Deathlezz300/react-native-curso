import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import ThemeText from "@/components/ThemeText";
import CalculatorButton from "@/components/CalculatorButton";
import ButtonsData from "@/constants/ButtonsData";
import * as NavigationBar from "expo-navigation-bar";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorButtonI } from "@/interface";

const CalculatorApp = () => {
  const isAndroid = Platform.OS === "android";

  isAndroid && NavigationBar.setBackgroundColorAsync("black");

  const {
    equation,
    number,
    previusNumber,
    buildNumber,
    toogleSign,
    handleClear,
    handleDelNumber,
    divideOperation,
    addOperation,
    multiPlayOperation,
    subtractOperation,
    handleButtonCalculateResult,
  } = useCalculator();

  const handleActionButton = (button: CalculatorButtonI) => {
    if (button.variant === "number") {
      buildNumber(button.label);
    }

    if (button.variant === "action") {
      switch (button.label) {
        case "C":
          handleClear();
          break;
        case "del":
          handleDelNumber();
          break;
        case "+/-":
          toogleSign();
          break;
      }
    }

    if (button.variant === "operator") {
      switch (button.label) {
        case "/":
          divideOperation();
          break;
        case "x":
          multiPlayOperation();
          break;
        case "+":
          addOperation();
          break;
        case "-":
          subtractOperation();
          break;
        case "=":
          handleButtonCalculateResult();
          break;
      }
    }
  };

  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={styles.resultContainer}>
        <ThemeText variant="primary">{equation}</ThemeText>
        <ThemeText variant="secondary">
          {previusNumber === equation ? "" : previusNumber}
        </ThemeText>
      </View>
      <View style={styles.buttonsContainer}>
        {ButtonsData.map((button) => (
          <CalculatorButton
            key={button.label}
            label={button.label}
            variant={button.variant}
            onPressAction={() => handleActionButton(button)}
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
