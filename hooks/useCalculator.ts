import { useEffect, useRef, useState } from "react";

enum Operator {
  add = "+",
  subtract = "-",
  multiply = "x",
  divide = "/",
}

export const useCalculator = () => {
  const [equation, setEquation] = useState<string>("");

  const [number, setNumber] = useState<string>("0");

  const [previusNumber, setPreviusNumber] = useState<string>("");

  const lastOperation = useRef<Operator>();

  const buildNumber = (numberString: string) => {
    if (isNaN(parseFloat(numberString)) && numberString !== ".") return;

    if (number.includes(".") && numberString === ".") return;

    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString);
      }

      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      if (numberString === "0" && !number.includes(".")) {
        return;
      }
    }

    setNumber(number + numberString);
  };

  const handleDelNumber = () => {
    let currentSign = "";
    let temporalNumber = number;

    if (temporalNumber.includes("-")) {
      currentSign = "-";
      temporalNumber = temporalNumber.substring(1);
    }

    const slicedString = temporalNumber.slice(0, -1);
    setNumber(slicedString === "" ? "0" : currentSign + slicedString);
  };

  const handleClear = () => {
    setEquation("0");
    setNumber("0");
    setPreviusNumber("");

    lastOperation.current = undefined;
  };

  const toogleSign = () => {
    if (number.includes("-")) {
      setNumber(number.replace("-", ""));
    } else {
      setNumber("-" + number);
    }
  };

  const setLastNumber = () => {
    if (number.endsWith(".")) {
      setPreviusNumber(number.slice(0, -1));
    }

    setPreviusNumber(number);
    setNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiPlayOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const calculateResult = () => {

    const [ firstNumber , operator , secondNomber ]=equation.split(' ');

    if(!firstNumber) return '0';

    if(!operator || !secondNomber) return firstNumber;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNomber);


    switch (operator) {
        case Operator.add:
            return (num1 + num2).toString();
        case Operator.subtract:
            return (num1 - num2).toString();
        case Operator.multiply:
            return (num1 * num2).toString();
        case Operator.divide:
            if(num2===0) return '0';
            return (num1 / num2).toString();
        default:
            return firstNumber;
    }

  }

  const handleButtonCalculateResult = ()=>{
    const result=calculateResult();

    setPreviusNumber('');
    setNumber(result);

    lastOperation.current=undefined;

  }

  useEffect(() => {
     const subResult = calculateResult();
     setPreviusNumber(subResult);
  }, [equation]);

  useEffect(()=>{
    if(!lastOperation.current) return setEquation(number);

    const firstFormularPart = equation.split(' ').at(0);

    setEquation(`${firstFormularPart} ${lastOperation.current} ${number}`);

  },[number])

  return {
    equation,
    number,
    previusNumber,
    buildNumber,
    handleDelNumber,
    handleClear,
    toogleSign,
    divideOperation,
    multiPlayOperation,
    addOperation,
    subtractOperation,
    handleButtonCalculateResult,
  };
};
