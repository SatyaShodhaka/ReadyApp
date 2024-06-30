import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'

import { router } from 'expo-router'

const SignIn = () => {

  const[isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    // Submit to firebase
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

        <CustomButton
          title = "Sign In"
          handlePress={() => router.push('/home')}
          containerStyles = "px-4 mt-10"
          className="px-4"
        />

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