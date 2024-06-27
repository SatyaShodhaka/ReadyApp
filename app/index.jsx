import {StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView

 } from 'react-native-safe-area-context'
import CustomButton from './CustomButton'
const  App= () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full justify-center items-center h-full px-4'>
        
        <Text className="text-primary font-psemibold">
        
        If you agree to the terms and conditions continue below
        </Text>
        
        <CustomButton
         title = "Continue with the research"
         handlePress={() => {}}
         containerStyles="mt-4 w-full mx-4"
        />
      

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({})