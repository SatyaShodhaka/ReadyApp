import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';

const Survey = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState({
    driverFeedback: '',
    orderAcceptanceReason: '',
    orderRejectionReason: ''
  });

  const submitSurvey = async () => {
    setIsSubmitting(true);
    try {
      // Submit surveyData to the backend or database
      console.log(surveyData);
      alert('Survey submitted successfully');
    } catch (error) {
      console.log(error);
      alert('Survey submission failed\n' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full px-4 my-6 justify-center items-center">
          <Text className='text-4xl text-psemibold mt-20'>Survey</Text>
        </View>

        <View className="w-full px-4 mt-6">
          <Text className='text-lg font-psemibold'>Driver Feedback</Text>
          <TextInput
            value={surveyData.driverFeedback}
            onChangeText={(text) => setSurveyData({ ...surveyData, driverFeedback: text })}
            placeholder="Enter your feedback"
            multiline
            numberOfLines={4}
            className="border p-2 mt-2 rounded"
          />
        </View>

        <View className="w-full px-4 mt-6">
          <Text className='text-lg font-psemibold'>Order Acceptance Reason</Text>
          <TextInput
            value={surveyData.orderAcceptanceReason}
            onChangeText={(text) => setSurveyData({ ...surveyData, orderAcceptanceReason: text })}
            placeholder="Reason for accepting the order"
            className="border p-2 mt-2 rounded"
          />
        </View>

        <View className="w-full px-4 mt-6">
          <Text className='text-lg font-psemibold'>Order Rejection Reason</Text>
          <TextInput
            value={surveyData.orderRejectionReason}
            onChangeText={(text) => setSurveyData({ ...surveyData, orderRejectionReason: text })}
            placeholder="Reason for rejecting the order"
            className="border p-2 mt-2 rounded"
          />
        </View>

        {isSubmitting ? (
          <ActivityIndicator size="large" color="#0000ff" className='mt-10' />
        ) : (
          <CustomButton
            title="Submit Survey"
            handlePress={submitSurvey}
            containerStyles="px-4 mt-10"
            className="px-4"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Survey;

const styles = StyleSheet.create({});
