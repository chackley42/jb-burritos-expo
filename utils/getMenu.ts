import AsyncStorage from "@react-native-async-storage/async-storage";

const getMenuDataFromAsyncStorage = async () => {
    try {
      const menuDataJSON = await AsyncStorage.getItem('menuData');
      if (menuDataJSON !== null) {
        const parsedMenuData = JSON.parse(menuDataJSON);
        console.log('Menu data retrieved from AsyncStorage:', parsedMenuData);
        return parsedMenuData;
      } else {
        console.log('Menu data not found in AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving menu data from AsyncStorage:', error);
      throw error;
    }
  };
  
  // Call this function to retrieve the menu data
  const menuData = getMenuDataFromAsyncStorage();

  export default menuData;
  