import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';

const PinInputModal = ({ visible, onClose, onSuccess, onTransactionFail }) => {
  const [pin, setPin] = useState('');
  const [circles, setCircles] = useState(Array(6).fill('grey')); // Circle colors
  const [errorCount, setErrorCount] = useState(0); // Count of incorrect PIN attempts
  const defaultPin = '000000'; // Default PIN

  const handlePinInput = (digit) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);

      // Update the circle color
      const newCircles = [...circles];
      newCircles[newPin.length - 1] = 'default-blue'; // Filled circle becomes blue
      setCircles(newCircles);

      // If PIN length reaches 6, validate
      if (newPin.length === 6) {
        // Cek jika PIN adalah '110625' agar selalu salah
        if (newPin === '190424') {
          Alert.alert('Error', 'PIN 190424 tidak diperbolehkan!');
          setErrorCount(errorCount + 1); // Increment the error count
          resetPin();
        } else if (newPin === defaultPin) {
          Alert.alert('Success', 'PIN benar!');
          onSuccess(); // Navigate to Success page
        } else {
          setErrorCount(errorCount + 1); // Increment the error count
          Alert.alert('Error', 'PIN salah!');

          if (errorCount + 1 >= 3) {
            // If errors exceed 3, call onTransactionFail
            onTransactionFail(); 
          } else {
            resetPin(); // Reset PIN and circles
          }
        }
      }
    }
  };

  const resetPin = () => {
    setPin('');
    setCircles(Array(6).fill('grey')); // Reset circles to gray
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      const newPin = pin.slice(0, -1);
      setPin(newPin);

      // Reset the last filled circle
      const newCircles = [...circles];
      newCircles[newPin.length] = 'grey';
      setCircles(newCircles);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg items-center w-full">
          <Text className="text-lg font-bold mb-6">Masukkan PIN</Text>

          <View className="flex-row justify-between mb-8 w-full px-8">
            {circles.map((color, index) => (
              <View
                key={index}
                className={`w-6 h-6 bg-${color}`}
              />
            ))}
          </View>

          {/* Number Pad */}
          <View className="flex-wrap flex-row justify-center w-full">
            {[...Array(10).keys()].map((num) => (
              <TouchableOpacity
                key={num}
                className="w-20 h-20 justify-center items-center"
                onPress={() => handlePinInput(num.toString())}
              >
                <Text className="text-2xl font-bold">{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Delete Button */}
          <TouchableOpacity
            className="mt-4 bg-black px-6 py-3 rounded-md"
            onPress={handleDelete}
          >
            <Text className="text-white font-bold">Hapus</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity
            className="mt-2 bg-black rounded-md w-10 h-10 justify-center items-center"
            onPress={() => {
              resetPin();
              onClose();
            }}
          >
            <Text className="text-white">Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PinInputModal;
