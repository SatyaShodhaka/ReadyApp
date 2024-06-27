import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.8}
      className={` ☐ bg-orange-500
        rounded-xl min-h-[62px] justify-center items-center ${{containerStyles}}`}>
        <Text className= {`text-primary font-psemibold text-lg${{textStyles}} `}>
        {title}
        </Text>
    </TouchableOpacity>
  )
} 

export default CustomButton

const styles = StyleSheet.create({})