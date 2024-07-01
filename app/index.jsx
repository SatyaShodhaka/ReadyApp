import {StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView} from 'react-native-safe-area-context'
import CustomButton from './components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from '@/firebaseConfig'


const  App = () => {

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full justify-center items-center h-full px-4'>
        
        <Text className="text-primary font-psemibold mb-5">
        
        If you agree to the terms and conditions continue below
        </Text>
        
        <CustomButton
          title = "Continue with the research"
          handlePress={() => router.push('/sign-in')}
          containerStyles="mt-4 w-full mx-4"
        />
        </View>
      </ScrollView>

      {/* Dark Mode */}
      {/* <StatusBar backgroundColor='#161622'
        style='light' />
        I */}
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({})