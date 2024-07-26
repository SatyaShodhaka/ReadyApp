import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Example icon library

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center">
      <MaterialIcons name={icon} size={24} color={focused ? color : 'gray'} />
      <Text className={`${focused ? 'font-semibold text-blue-500' : 'font-regular text-gray-500'} text-xs mt-1`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="home" color={color} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="history" color={color} name="Trips" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="survey"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="access-time-filled" color={color} name="Survey" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="person" color={color} name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
