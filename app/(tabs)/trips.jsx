import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Button } from 'react-native';
import * as Location from 'expo-location';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../firebaseConfig'; // Adjust the import according to your file structure
import { styled } from 'nativewind';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const Trips = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        storeLocation(location);
      }
    })();
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
        Alert.alert('Location stored successfully!');
      } catch (error) {
        console.error('Error storing location: ', error);
        Alert.alert('Error storing location');
      }
    } else {
      Alert.alert('No user is authenticated');
    }
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledText className="text-lg mb-4">{text}</StyledText>
      <StyledButton
        title="Get Location"
        onPress={() => {}}
        className="bg-blue-500 text-white p-4 rounded"
      />
    </StyledView>
  );
};

export default Trips;
