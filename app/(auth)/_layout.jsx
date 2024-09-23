import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig'

const AuthLayout = () => {

  const[user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
      setLoading(false);
      if (user) {
        router.replace('/(tabs)/home');
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    
      <>
      {loading && 
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }

      {user ? (
       null
      ) :
        
        (<Stack>
          <Stack.Screen name='sign-in' options={{headerShown: false}}/>
          <Stack.Screen name='sign-up' options={{headerShown: false}}/>
          </Stack>)
      
      }
      </>
  )
}



export default AuthLayout

const styles = StyleSheet.create({})