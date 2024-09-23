import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../firebaseConfig';
import * as Location from 'expo-location';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Constants
const AUTH_URL = 'https://login.uber.com/oauth/v2/authorize';
const TOKEN_URL = 'https://login.uber.com/oauth/v2/token';
const CLIENT_ID = 'v4y05NaKaBl--EoH4_tozr9CH2-AdSyS';
const CLIENT_SECRET = 'yRrO78Lw9FeUJ5Ek5Xx6FF-bKwICZlB6VB5I-Psf';
const REDIRECT_URI = 'readyapp://redirect';
const SCOPE = 'guest.trips'; // Use a valid scope

console.log('REDIRECT_URI:', REDIRECT_URI); // Log the redirect URI

// Function to exchange code for token
async function exchangeCodeForToken(code) {
  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        code,
      }).toString(),
    });

    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      console.error('Error fetching access token:', data);
      Alert.alert('Error', 'Failed to fetch access token');
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    Alert.alert('Error', 'An error occurred while fetching access token');
  }
}

async function clearToken() {
  try {
    await AsyncStorage.removeItem('uberAccessToken');
    Alert.alert('Success', 'Access token removed successfully!');
  } catch (error) {
    console.error('Error removing access token:', error);
    Alert.alert('Error', 'An error occurred while removing the access token');
  }
}

// AuthScreen Component
function AuthScreen({ onAuthComplete, onClose }) {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const url = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri${REDIRECT_URI}`;
    console.log('Auth URL:', url); // Log the auth URL for debugging
    setAuthUrl(url);
  }, []);

  const handleNavigationStateChange = async (navState) => {
    console.log('Navigation State URL:', navState.url); // Log the navigation state URL for debugging
    if (navState.url.startsWith(REDIRECT_URI)) {
      const code = new URL(navState.url).searchParams.get('code');
      if (code) {
        const accessToken = await exchangeCodeForToken(code);
        if (accessToken) {
          console.log('Access Token:', accessToken); // Print the access token
          await AsyncStorage.setItem('uberAccessToken', accessToken);
          onAuthComplete();
        }
      } else {
        const error = new URL(navState.url).searchParams.get('error');
        if (error) {
          console.error('OAuth Error:', error);
          Alert.alert('Error', `OAuth Error: ${error}`);
        }
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!authUrl}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <Button title="Close" onPress={onClose} />
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          className="flex-1"
        />
      </SafeAreaView>
    </Modal>
  );
}

// Home Component
const Home = () => {
  const [authInitiated, setAuthInitiated] = useState(false);
  const [authCompleted, setAuthCompleted] = useState(false);
  const user = FIREBASE_AUTH.currentUser;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let intervalId;

    const startLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      intervalId = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (location) {
          storeLocation(location);
        }
      }, 10000); // 10000 milliseconds = 10 seconds
    };

    startLocationTracking();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const storeLocation = async (location) => {
    if (user) {
      try {
        await addDoc(collection(FIREBASE_FIRESTORE, 'locations'), {
          uid: user.uid,
          email: user.email,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: serverTimestamp(),
        });
        console.log('Location stored successfully!');
      } catch (error) {
        console.error('Error storing location: ', error);
        Alert.alert('Error storing location');
      }
    } else {
      Alert.alert('No user is authenticated');
    }
  };


  useEffect(() => {
    // Check for existing access token
    const checkForExistingToken = async () => {
      const accessToken = await AsyncStorage.getItem('uberAccessToken');
      if (accessToken) {
        setAuthCompleted(true);
      }
    };

    checkForExistingToken();
  }, []);

  const handleAuthComplete = () => {
    setAuthCompleted(true);
    setAuthInitiated(false);
    Alert.alert('Success', 'Uber account linked successfully!');
  };

  const handleLinkUberAccount = () => {
    setAuthInitiated(true);
  };

  const handleCloseModal = () => {
    setAuthInitiated(false);
  };

  const clearAccessToken = async () => {
    await clearToken();
    setAuthCompleted(false);
    Alert.alert('Success', 'Logged out and cleared session.');
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white">
      <View className="w-full px-4 py-6 mt-20">
        {user && (
          <Text className="text-4xl font-semibold mb-4">
            Welcome,{"\n"}
            {user.email}! 🎉
          </Text>
        )}
        <View className="w-full mt-6">
          {!authCompleted ? (
            <TouchableOpacity className="bg-black py-4 rounded-xl" onPress={handleLinkUberAccount}>
              <Text className="text-center text-white text-lg">
                Link your Uber account
              </Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text className="text-base text-black">Uber account linked successfully!</Text>
              <TouchableOpacity className="bg-red-500 py-4 rounded-xl mt-4" onPress={clearAccessToken}>
                <Text className="text-center text-white text-lg">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Initiate location storing */}
      {authInitiated && (
        <AuthScreen
          onAuthComplete={handleAuthComplete}
          onClose={handleCloseModal}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
