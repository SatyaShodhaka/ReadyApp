import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from Expo
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../firebaseConfig'; // Make sure this points to your firebase config
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions
import { data } from './data'; // Assume this is an array of trip objects

const StyledView = styled(View);
const StyledText = styled(Text);

const StarRating = ({ tripId, rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View className="flex-row mt-2">
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(tripId, star)} // Set the rating on press
        >
          <FontAwesome
            name={star <= rating ? 'star' : 'star-o'} // Filled star for selected rating, empty star otherwise
            size={24}
            color="#FFD700"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Trips = () => {
  const [tripData, setTripData] = useState([]);
  const [ratings, setRatings] = useState({}); // State to store ratings for each trip
  const user = FIREBASE_AUTH.currentUser; // Get the authenticated user

  useEffect(() => {
    if (data) {
      setTripData(data); // Assume data is an array of trip objects
    }
  }, []);

  // Function to handle setting rating for each trip and saving to Firestore
  const handleSetRating = async (tripId, rating) => {
    // Update local state
    setRatings((prevRatings) => ({
      ...prevRatings,
      [tripId]: rating, // Update rating for specific trip
    }));

    try {
      if (user) {
        // Create a unique document ID using a combination of user ID and trip ID
        const ratingDocRef = doc(FIREBASE_FIRESTORE, 'ratings', `${user.uid}_${tripId}`);
        console.log("Storing rating...")
        // Use setDoc to either create or update the rating in the "ratings" collection
        await setDoc(ratingDocRef, {
          uid: user.uid, // Store the user ID
          email: user.email, // Store the user email
          tripId: tripId, // Store the trip ID
          rating: rating, // Store the rating value
          timestamp: serverTimestamp(), // Store the server timestamp
        }, { merge: true }); // merge: true allows merging instead of overwriting

        console.log(`Rating for trip ${tripId} set to ${rating}`);
      } else {
        Alert.alert('No user is authenticated');
      }
    } catch (error) {
      console.error('Error storing rating: ', error);
      Alert.alert('Error storing rating');
    }
  };

  const renderTrip = ({ item }) => (
    <View className="flex-row p-4 m-2 border border-gray-300 rounded-lg bg-white">
      {/* Trip Details */}
      <View className="flex-1 justify-center">
        <Text className="text-lg font-semibold text-gray-800">Trip ID: {item.id}</Text>
        <Text className="text-md text-gray-800">Employer: {item.employer}</Text>
        <Text className="text-md text-gray-800">Type: {item.type}</Text>
        <Text className="text-md text-gray-800">Status: {item.status}</Text>
        <Text className="text-md text-gray-800">Duration: {item.duration}</Text>
        <Text className="text-md text-gray-800">
          Started at: {new Date(item.start_datetime).toLocaleDateString()}{' '}
          {new Date(item.start_datetime).toLocaleTimeString()}
        </Text>
        <Text className="text-md text-gray-800">
          Ended at: {new Date(item.end_datetime).toLocaleDateString()}{' '}
          {new Date(item.end_datetime).toLocaleTimeString()}
        </Text>
        {/* Star Rating */}
        <StarRating
          tripId={item.id}
          rating={ratings[item.id] || 0} // Pass the current rating for this trip, default is 0
          setRating={handleSetRating} // Pass the handler function to update rating and save to Firestore
        />
      </View>
    </View>
  );

  return (
    <StyledView className="flex-1 items-center justify-start bg-white">
      <View className="w-full px-4 py-6 mt-20">
        <StyledText className="text-4xl font-semibold mb-4">Trips</StyledText>
        <FlatList
          data={tripData} // Pass the array of trip data
          keyExtractor={(item) => item.id.toString()} // Unique key for each trip
          renderItem={renderTrip} // Function to render each trip item
        />
      </View>
    </StyledView>
  );
};

export default Trips;
