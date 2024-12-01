import { View, Text, Pressable, PressableProps } from "react-native";
import { forwardRef, Ref } from "react";
import { colorTypes } from "@/interface";

interface props extends PressableProps {
  color: colorTypes;
  children: string;
}

const CustomButton = forwardRef(
  ({ color = "primary", children, ...rest }: props, ref: Ref<View>) => {

    const colorValue={
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        tertiary: 'bg-tertiary',
    }[color]

    return (
      <Pressable
        ref={ref}
        className={`w-full rounded-lg text-center py-4 ${colorValue} active:opacity-80`}
        {...rest}
      >
        <Text className="font-works-black text-xl text-center text-white">{children}</Text>
      </Pressable>
    );
  }
);

export default CustomButton;
