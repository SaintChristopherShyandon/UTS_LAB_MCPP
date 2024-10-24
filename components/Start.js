import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const Start = () => {
  return (
    <View className="flex-1 bg-gray-100 pt-10">
      <Header />
      <View className="bg-default-blue mx-4 p-6 flex-col rounded-xl">
            <Text className="text-sm text-white">Saint Christopher Shyandon</Text>
            <Text className="font-bold text-xl text-white">2022</Text>
      </View>
      <Body />
      <Footer />
    </View>
  );
};

export default Start;
