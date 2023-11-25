import React from 'react'
import {
  TextInput as Input,
  InputModeOptions,
  StyleProp,
  TextStyle,
  Text
} from 'react-native'
import styles from './text-input.styles'
import { useTheme } from '@react-navigation/native'

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
  const { colors } = useTheme()

  return (
    <>
      {label && (
        <Text style={[{ color: colors.text }, styles.label, labelStyles]}>
          {label}
        </Text>
      )}
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
