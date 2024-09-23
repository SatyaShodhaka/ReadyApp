import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig'

const SignUp = () => {

  const[isSubmitting, setIsSubmitting] = useState(false)

  const auth = FIREBASE_AUTH;

  const submit = async () => {
    // Submit to firebase
      setIsSubmitting(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, form.email, form.password)
        const user = response.user;
        console.log(response); 
        alert('Sign up successful');
      } catch(error) {
        console.log(error);
        alert('Sign up failed \n' + error.message);
      } finally {
        setIsSubmitting(false);
      }
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full px-4 my-6 justify- items-center">
          <Text className='text-4xl text-psemibold'>Sign Up</Text>
        </View>

        <FormField
          title="First Name"
          type="text"
          value={form.firstName}
          handleChangeText={(e) => setForm({...form, firstName: e})}
          otherStyles="mt-4"
        />

        <FormField
          title="Last Name"
          type="text"
          value={form.lastName}
          handleChangeText={(e) => setForm({...form, lastName: e})}
          otherStyles="mt-4"
        />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="px-4 mt-10"
            className="px-4"
          />
        )}

        <View className='justify-center items-center pt-5 flex-row gap-2'>
            <Text className='text-lg'>
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-blue-700'>Sign In</Link>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})