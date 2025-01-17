import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Footer = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4">
      <View className="flex flex-row justify-around items-center">
        <TouchableOpacity 
          className="items-center"
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require('../assets/home.png')}
            className="w-6 h-6" // Icon size
            resizeMode="contain"
          />
          <Text className="mt-2 text-center">Main</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => navigation.navigate('Transaction')}
        >
          <Image
            source={require('../assets/file.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="mt-2 text-center">History</Text>
        </TouchableOpacity>

        <View className="items-center">
          <Image
            source={require('../assets/email.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="mt-2 text-center">Gmail</Text>
        </View>

        <TouchableOpacity 
          className="items-center" 
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={require('../assets/user.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className="mt-2 text-center">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
