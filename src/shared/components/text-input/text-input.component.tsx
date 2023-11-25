import React from 'react'
import {
  TextInput as Input,
  InputModeOptions,
  StyleProp,
  TextStyle,
  Text
} from 'react-native'
import styles from './text-input.styles'

type TextInputProps = {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  inputMode?: InputModeOptions | undefined
  secureTextEntry?: boolean
  inputStyles?: StyleProp<TextStyle>
  labelStyles?: StyleProp<TextStyle>
  label?: string
}

const TextInput = ({
  placeholder,
  value,
  onChangeText,
  inputMode,
  secureTextEntry,
  inputStyles,
  label,
  labelStyles
}: TextInputProps) => {
  return (
    <>
      {label && <Text style={[styles.label, labelStyles]}>{label}</Text>}
      <Input
        style={[styles.input, inputStyles]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        secureTextEntry={secureTextEntry}
      />
    </>
  )
}

export default TextInput
