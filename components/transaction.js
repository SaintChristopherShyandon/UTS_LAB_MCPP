import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Menu from './Footer'; // Import Menu
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Transaction = ({ route }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const phoneNumber = route.params?.phoneNumber;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem('transactions');
        if (savedTransactions !== null) {
          const parsedTransactions = JSON.parse(savedTransactions);

          // Filter out invalid transactions
          const validTransactions = parsedTransactions.filter(
            (transaction) => transaction.price && transaction.trace && transaction.date && transaction.time
          );

          setTransactions(validTransactions);
        }
      } catch (error) {
        console.error('Error fetching transactions from storage:', error);
      }
    };

    // Fetch transactions when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTransactions();
    });

    // Cleanup the listener on component unmount
    return unsubscribe;
  }, [navigation]);

  const filteredTransactions = transactions.filter((t) =>
    t.trace.includes(searchText)
  );

  const handleTransactionPress = (transaction) => {
    console.log('Transaction details:', transaction); // Untuk melihat apakah ada `price`
    navigation.navigate('DetailTransaksi', {
      transaction,
      phoneNumber,
      approvalCode: transaction.approvalCode,
    });
  };

  return (
    <View className="flex-1 bg-white p-4 pt-10">
      <View className="flex-row items-center mb-4">
        <Text className="text-lg font-bold">Histori Transaksi</Text>
      </View>
      <View>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Cari menggunakan No. Trace"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTransactionPress(item)}>
              <View className="flex-row justify-between p-2 border-b border-gray-300 items-center">
                <Text className="font-semibold">No. Trace: {item.trace}</Text>
                <View>
                  <Text className="text-sm text-gray-500">
                    {item.date} | {item.time}
                  </Text>
                  <Text className="font-bold ml-16">{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="justify-center items-center">
              <Image source={require('../assets/no.png')} />
              <Text className="text-center mt-4">Belum ada transaksi dilakukan.</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
      <Menu />
    </View>
  );
};
export default Transaction;
