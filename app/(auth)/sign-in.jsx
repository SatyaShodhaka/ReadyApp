import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { router } from 'expo-router'

const SignIn = () => {

  const[isSubmitting, setIsSubmitting] = useState(false)

  const auth = FIREBASE_AUTH;

  const submit = async () => {
    // Submit to firebase
    setIsSubmitting(true);
    try {
      const response = await signInWithEmailAndPassword(auth, form.email, form.password)
      const user = response.user;
      console.log(response); 
      alert('Sign in successful');
    } catch(error) {
      console.log(error);
      alert('Sign in failed \n' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full px-4 my-6 justify-center items-center">
          <Text className='text-4xl text-psemibold mt-20'>Sign In</Text>
        </View>

        <FormField
          title="Email"
          type="email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles="mt-4"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles="mt-4"
        />

      {isSubmitting ? (
          <ActivityIndicator size="large" color="#0000ff" className='mt-10' />
        ) : (
          <CustomButton
            title = "Sign In"
            handlePress={submit}
            containerStyles = "px-4 mt-10"
            className="px-4"
          />
        )}

        <View className='justify-center items-center pt-5 flex-row gap-2'>
            <Text className='text-lg'>
              Don't have an account?
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-blue-700'>Sign Up</Link>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})