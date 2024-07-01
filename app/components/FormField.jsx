import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 mx-4 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-pmedium">{title}</Text>
      <View className='border-2 w-full h-16 px-4 bg-black-200 rounded-2xl focus:border-blue-600 flex-row items-center'>
        <TextInput
          className='flex-1 text-black-100 h-100 py-0 font-pmedium text-base align-middle'
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-blue-600">{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
