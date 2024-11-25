import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CounterButton from "./components/Counter/CounterButton";

export default function App() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter - 1 < 0) return;

    setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textCounter}>{counter}</Text>
      <View style={styles.buttonsContainer}>
        <CounterButton
          functionAction={decrement}
          label="-1"
          reset={() => setCounter(0)}
        />
        <CounterButton
          functionAction={increment}
          label="+1"
          reset={() => setCounter(0)}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "column",
  },

  textCounter: {
    fontSize: 120,
    fontWeight: "bold",
    flex: 1,
    width: "100%",
    verticalAlign: "middle",
    textAlign: "center",
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    width: "100%",
  },
});
