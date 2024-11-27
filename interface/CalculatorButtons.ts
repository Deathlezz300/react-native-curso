type ButtonVariants="operator" | "action" | "number";

interface CalculatorButtonI{
    variant:ButtonVariants;
    label:string;
}

export {
    CalculatorButtonI,
    ButtonVariants
}