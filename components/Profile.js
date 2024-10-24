import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Menu from './Footer'; // Import Menu
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [defaultPin] = useState('000000'); // Default PIN

  const handlePinChange = () => {
    Alert.alert('PIN anda', '000000');
  };

  return (
    <View className="flex-1 bg-grey">
      <View className="p-4 pt-12">
        {/* Header Section */}
        <View className="flex-row items-center mb-4">
          <Text className="text-lg font-bold ml-4">Profile</Text>
        </View>

        {/* Profile Information */}
        <View className="justify-center mt-8 items-center flex-col">
          <Image 
            source={require('../assets/profile.png')} 
            className="w-44 h-44 rounded-full" 
          />
          <View className="mt-8 items-center">
            <Text className="text-xl font-semibold">Saint Christopher Shyandon</Text>
            <Text className="text-lg font-semibold">00000075026</Text>
            <Text className="text-sm font-semibold">(19 April 2004)</Text>
          </View>
        </View>

        {/* Set PIN Button */}
        <View className="mt-80 items-center">
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-md"
            onPress={handlePinChange}
          >
            <Text className="font-bold">Lihat PIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Menu />
    </View>
  );
};

export default Profile;
