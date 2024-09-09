import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { FIREBASE_AUTH } from '@/firebaseConfig'; // Ensure this path is correct
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();
  const user = FIREBASE_AUTH.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      router.push('/sign-in');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-start p-4">
        <Text className="text-4xl font-semibold mb-4">Profile</Text>
        <View className="items-center">
        {user && (
          <View className="w-full mb-5 px-4">
            <Text className="text-lg font-semibold">Email:</Text>
            <Text className="text-lg mb-2">{user.email}</Text>
          </View>
        )}
        <CustomButton
          title="Logout"
          handlePress={handleLogout}
          containerStyles="mt-10 w-full"
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
