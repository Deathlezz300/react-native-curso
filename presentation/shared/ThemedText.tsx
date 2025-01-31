import { View, Text, TextProps } from 'react-native'
import React from 'react'

type TextType= "normal" | "h1" | "h2" | "semi-bold" | "link";

interface props extends TextProps{
    className?: string;
    type?: TextType;
}

const ThemedText = ({ className , children , type="normal" , ...rest }:props) => {
  return (
    <Text className={[
        "text-light-text dark:text-dark-text",
        type === "normal" && "font-normal",
        type === "h1" && "text-3xl",
        type === "h2" && "text-xl",
        type === "semi-bold" && "font-semibold",
        type === "link" && "font-normal underline",
        className
    ].join(" ")} {...rest}>
        {children}
    </Text>
  )
}

export default ThemedText