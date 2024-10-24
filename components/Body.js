import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const carouselItems = [
  { imgSrc: require('../assets/promo1.jpeg'), caption: 'Promo 1' },
  { imgSrc: require('../assets/promo2.jpeg'), caption: 'Promo 2' },
  { imgSrc: require('../assets/promo3.jpeg'), caption: 'Promo 3' },
];

const Body = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);

  // Function to handle auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => {
        const nextPage = (prevPage + 1) % carouselItems.length;
        pagerRef.current.setPage(nextPage);
        return nextPage;
      });
    }, 3000); // Set slide interval to 3 seconds

    return () => clearInterval(interval);
  }, []);

  const renderPage = (item, index) => (
    <View key={index} className="items-center">
      <Image
        source={item.imgSrc}
        className="w-full h-40"
        resizeMode="contain"
      />
    </View>
  );

  const renderDots = () => {
    return (
      <View className="flex-row justify-center mt-2">
        {carouselItems.map((_, index) => (
          <Text
            key={index}
            className={`mx-1 ${
              currentPage === index ? 'text-white' : 'text-gray-400'
            }`}
          >
            ●
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 m-4 mt-10">
      {/* Section dengan tiga icon */}
      <View className="flex-row justify-evenly pb-6">
        <TouchableOpacity // Tambahkan TouchableOpacity untuk navigasi Listrik
          className="items-center"
          onPress={() => navigation.navigate('Listrik')} // Navigasi ke tab Listrik
        >
          <Image
            source={require('../assets/flash.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Text>Listrik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => navigation.navigate('Pulsa')} // Navigasi ke Pulsa.js
        >
          <Image
            source={require('../assets/mobile-data.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Text>Pulsa/Data</Text>
        </TouchableOpacity>
        <TouchableOpacity // Tambahkan TouchableOpacity untuk navigasi BPJS
          className="items-center"
          onPress={() => navigation.navigate('BPJS')} // Navigasi ke halaman BPJS
        >
          <Image
            source={require('../assets/healthcare.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Text>BPJS</Text>
        </TouchableOpacity>
      </View>

      {/* PagerView/Slider Section */}
      <View className="p-4">
        <PagerView
          ref={pagerRef}
          style={{ width: screenWidth - 60, height: 200 }}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {carouselItems.map((item, index) => renderPage(item, index))}
        </PagerView>
        {/* Dots Indicator */}
        {renderDots()}
      </View>
    </View>
  );
};

export default Body;