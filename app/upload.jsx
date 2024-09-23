import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';


const Upload = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("John Doe"); // Replace with actual user name

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
  
      setFiles([...files, { ...result }]);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled document picker');
      } else {
        console.error(err);
      }
    }
  };


  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    setUploading(true);
    try {
    //   const uploadPromises = files.map(async (file) => {
    //     try {
    //       console.log(`Starting upload for file: ${file.name}`);
  
    //       // Use the fetch API to get the file's Blob
    //       const response = await fetch(file.uri);
    //       const blob = await response.blob();
  
    //       // Create a reference in Firebase Storage
    //       const fileRef = ref(FIREBASE_STORAGE, `uploads/${currentUserName}/${date.toISOString()}_${file.name}`);
    //       console.log(`Created Firebase storage reference at: uploads/${currentUserName}/${date.toISOString()}_${file.name}`);
  
    //       // Upload the Blob to Firebase Storage
    //       const uploadTask = uploadBytesResumable(fileRef, blob);
  
    //       // Monitor the progress and handle completion
    //       uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //           console.log(`Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
    //         },
    //         (error) => {
    //           console.error(`Error during file upload for ${file.name}:`, error.message);
    //           throw new Error(`File upload failed for ${file.name}`);
    //         },
    //         async () => {
    //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    //           console.log(`File uploaded successfully! Download URL: ${downloadURL}`);
    //         }
    //       );
  
    //       return uploadTask;
    //     } catch (fileError) {
    //       console.error(`Error during file upload for ${file.name}:`, fileError.message);
    //       throw new Error(`File upload failed for ${file.name}`);
    //     }
    //   });
  
    //   // Wait for all file uploads to complete
    //   await Promise.all(uploadPromises);
    

    // Usage example:
    await sleep(2000);
      console.log('All files uploaded successfully');
  
      // Show success alert
      Alert.alert('Upload Successful', 'All files have been uploaded successfully!');
      setFiles([]);  // Clear the files array after successful upload
    } catch (error) {
      console.error('Error uploading files:', error.message);
      Alert.alert('Upload Failed', `There was an error uploading your files. ${error.message}`);
    } finally {
      setUploading(false);
    }
  };
  
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  
  // Helper function to convert base64 to Blob with error handling
  const base64ToBlob = (base64, contentType = '', sliceSize = 512) => {
    try {
      console.log('Converting base64 to Blob...');
      const byteCharacters = atob(base64); // Decode base64 string to binary string
      const byteArrays = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
  
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i); // Convert each character to its char code
        }
  
        const byteArray = new Uint8Array(byteNumbers); // Convert array to Uint8Array
        byteArrays.push(byteArray);
      }
  
      // Create a Blob from the Uint8Array
      const blob = new Blob(byteArrays, { type: contentType });
      console.log('Conversion to Blob successful');
      return blob;
    } catch (error) {
      console.error('Error converting base64 to Blob:', error);
      throw new Error('Failed to convert base64 to Blob');
    }
  };
  
  
  

  const renderItem = ({ item, index }) => (
    <View className="flex-row justify-between items-center p-2 border-b border-gray-200">
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => removeFile(index)} className="p-2">
        <Text className="text-red-500">✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <View className="w-full px-4 my-6 justify-center items-center">
        <Text className='text-4xl text-psemibold mt-20'>Upload</Text>
      </View>
      <TouchableOpacity onPress={showDatepicker} className="mb-4">
        <Text className="text-lg">
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        onPress={pickDocument}
        className="p-4 bg-blue-500 rounded-lg mb-4"
      >
        <Text className="text-white text-center">Upload File</Text>
      </TouchableOpacity>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        className="mb-4"
      />
      <TouchableOpacity
        onPress={uploadFiles}
        disabled={uploading || files.length === 0}
        className={`p-4 rounded-lg ${
          uploading || files.length === 0 ? 'bg-gray-400' : 'bg-green-500'
        }`}
      >
        <Text className="text-white text-center">
          {uploading ? 'Uploading...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Upload;