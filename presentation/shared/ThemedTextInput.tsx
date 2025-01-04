import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface props extends TextInputProps{
    className?: string
}


const ThemedTextInput = ( { className , ...rest }:props) => {
  return (
    <TextInput
       className={`text-black py-4 dark:text-white ${className}`}
       placeholderTextColor="grey"
       {...rest}

    />
  )
}

export default ThemedTextInput