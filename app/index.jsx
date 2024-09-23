import {StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView} from 'react-native-safe-area-context'
import CustomButton from './components/CustomButton'

const  App = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.container}>

          {/* Updated Image Size */}
          <Image source={require('../assets/images/Ready.png')} style={styles.image} /> 

          {/* Disclaimer with better styling */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>• By joining, you agree to share ride-sourcing data (location, operational details) with our research team.</Text>
            <Text style={styles.disclaimerText}>• Data will be used only for research to improve driver efficiency and welfare.</Text>
            <Text style={styles.disclaimerText}>• Personal information will remain confidential and not shared without your consent.</Text>
          </View>

          {/* Button */}
          <CustomButton
            title="Continue with the research"
            handlePress={() => router.push('/sign-in')}
            containerStyles="mt-4 w-full mx-4"
          />
        </View>
      </ScrollView>

      {/* Dark Mode */}
      {/* <StatusBar backgroundColor='#161622' style='light' /> */}
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    justifyContent: 'start',
    marginTop: 100,
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  image: {
    width: 250,  // Adjusted width
    height: 250, // Adjusted height
    resizeMode: 'contain', // Ensures the image maintains aspect ratio and fits within the given dimensions
    marginBottom: 20,
  },
  disclaimerContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  disclaimerText: {
    fontSize: 16,  // Increased font size for better readability
    color: '#333',  // Text color
    lineHeight: 24,  // Increased line height for better spacing
    marginBottom: 10,  // Spacing between items
  },
});
