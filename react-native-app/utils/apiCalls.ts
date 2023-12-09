import AsyncStorage from '@react-native-async-storage/async-storage';
import iosLocalHost from './testingConsts';

export const fetchMenuDataAndStore = async () => {
  try {
    const collections = ['burritos', 'sides', 'drinks'];

    // Use Promise.all to fetch all collections simultaneously
    const fetchPromises = collections.map(async (collectionItem) => {
      const response = await fetch(`${iosLocalHost}/api/${collectionItem}`);
      if (response.ok) {
        const data = await response.json();
        console.log('COLLECTION ITEM NAME: ' + collectionItem)
        await AsyncStorage.setItem(collectionItem, JSON.stringify(data));
      }
    });

    await Promise.all(fetchPromises);
    console.log('I FINISHED GETTING ALL OF THE DATA')
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
};