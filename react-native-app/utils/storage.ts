import AsyncStorage from '@react-native-async-storage/async-storage';
import order from '../app/(tabs)/home/order';


export type Order = {
  orderID: string;
  phoneNumber: string;
  subtotal: string;
  tax: string;
  total: string;
  items: OrderItem[]; // Assuming items are represented as strings, modify the type accordingly if they have a specific structure
  username: string;
};

export type OrderItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };

export type MenuItem = {
    id: number;
    name: string;
    price: number;
    calories: number;
    description: string;
    image: string; // You can use string to represent the image URL or file path
  };

export function createMenuItem(id: number, name: string, price: number, calories: number, description: string, image: string): MenuItem {
    return {
      id,
      name,
      price,
      calories,
      description,
      image,
    };
  }
  
  export type Menu = {
    burritos: MenuItem[];
    sides: MenuItem[];
    drinks: MenuItem[];
  };
  
  const menu: Menu = {
    burritos: [
      {
        id: 1,
        name: 'Breakfast Burrito',
        price: 3.50,
        calories: 390,
        description: 'The burrito that started it all made with fresh tortilla, eggs, beef, and cheese',
        image: '../assets/breakfastBurrito.jpeg',
      },
      {
        id: 2,
        name: 'Bean and Cheese Burrito',
        price: 3.50,
        calories: 320,
        description: 'Made with fresh tortilla, bean and cheese',
        image: '../assets/beanAndCheeseBurrito.jpeg',
      },
      {
        id: 3,
        name: 'Veggie Burrito',
        price: 3.50,
        calories: 390,
        description: 'Made with fresh tortilla, rice, beans, tomatoes, corn and cheese.',
        image: '../assets/veggieBurrito.jpeg',
      },
      {
        id: 9,
        name: 'Virtual Burrito',
        price: 0.00,
        calories: 0,
        description: 'Worth as much as an NFT',
        image: '../assets/veggieBurrito.jpeg',
      },
    ],
    sides: [
      {
        id: 4,
        name: 'Fries',
        price: 2.00,
        calories: 250,
        description: 'Made with fresh potatoes, and salt.',
        image: 'fries.jpg',
      },
      // Add more side items here
      {
        id: 5,
        name: 'Bacon',
        price: 2.00,
        calories: 250,
        description: 'Made from fresh pork and fried to desired tast.',
        image: 'fries.jpg',
      }
    ],
    drinks: [
      {
        id: 6,
        name: 'Milk',
        price: 2.00,
        calories: 250,
        description: 'From fresh cows.',
        image: 'milk.jpeg',
      },
      // Add more drink items here
      {
        id: 7,
        name: 'Orange Juice',
        price: 2.00,
        calories: 250,
        description: 'From fresh oranges',
        image: 'orangeJuice.jpeg',
      },
    ],
  };
  export const getMenuData = () => menu;

  const storeMenuData = async () => {
    try {
      const menuDataJSON = JSON.stringify(menu);
      await AsyncStorage.setItem('menuData', menuDataJSON);
      console.log('Menu data stored in AsyncStorage.');
    } catch (error) {
      console.error('Error storing menu data in AsyncStorage:', error);
    }
  };

  export const getOrderData = async (): Promise<MenuItem[]> => {
    try {
        const orderData = await AsyncStorage.getItem('order');
        if (orderData) {
            const parsedOrderData: MenuItem[] = JSON.parse(orderData);
            console.log("***************************** "+ parsedOrderData)
            return parsedOrderData
        }
    } catch (error) {
      console.log(`Error retreiving Order data from AsyncStorage:`, error)
    }
  } 


export default storeMenuData

  