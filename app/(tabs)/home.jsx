import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {

  const user = FIREBASE_AUTH.currentUser;

  return (
    <SafeAreaView className="flex-1 items-cente justify-start bg-white mt-10">
      <View className="w-full px-4 py-6">
        {user && (
          <Text className="text-xl font-semibold mb-4">
            Welcome, {user.email}!
          </Text>
        )}
        <View className="w-full mt-6">
          <View className="bg-black py-4 rounded-xl">
            <Text className="text-center text-white text-lg">
              Link your Uber account
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
