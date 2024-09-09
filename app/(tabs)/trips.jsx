import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { styled } from 'nativewind';
import { data } from './data'; // Assume this is an array of trip objects

const StyledView = styled(View);
const StyledText = styled(Text);

const TripIncomeDetails = ({ income }) => {
  return (
    <View className="flex-1 justify-center">
      <Text className="text-lg font-semibold text-gray-800">Income Details</Text>
      <Text className="text-md text-gray-800">Currency: {income.currency}</Text>
      <Text className="text-md text-gray-800">Total Charge: ${income.total_charge}</Text>
      <Text className="text-md text-gray-800">Fees: ${income.fees}</Text>
      <Text className="text-md text-gray-800">Total: ${income.total}</Text>
      <Text className="text-md text-gray-800">Pay: ${income.pay}</Text>
      <Text className="text-md text-gray-800">Tips: {income.tips !== null ? `$${income.tips}` : 'No tips'}</Text>
      <Text className="text-md text-gray-800">Bonus: ${income.bonus}</Text>
      <Text className="text-md text-gray-800">Other: {income.other !== null ? `$${income.other}` : 'No other earnings'}</Text>
      <Text className="text-md text-gray-800">Customer Price: ${income.customer_price}</Text>
    </View>
  );
};

const Trips = () => {
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    if (data) {
      setTripData(data); // Assume data is an array of trip objects
    }
  }, []);

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
        {/* Uncomment to render income details */}
        {/* <TripIncomeDetails income={item.income} /> */}
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