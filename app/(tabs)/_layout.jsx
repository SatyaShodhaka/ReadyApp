import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Tabs, Redirect} from 'expo-router';

// import { images } from '../assets/icons';

const TabIcon = ({ icon, color, name, focused}) => {
  return (
    <View>
      {/* <Image
        source={}
        resizeMode='contain'
        tintColor={color}
        className={`w-6 h-6`}
      /> */}
      <Text className={`${focused? 'font-psemibold' :
      'font-pregular'} text-xs`}>
      {name}
      </Text>
    </View>
  )

}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name='home' 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon:({ color, focused}) => (
            <TabIcon 
            icon='react-logo' 
            color={color} 
            name='home' 
            focused={focused}/>
          )
          }}/>
        <Tabs.Screen name='Trips' 
        options={{headerShown: false}}/>
        <Tabs.Screen name='profile' 
        options={{headerShown: false}}/>
      </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})