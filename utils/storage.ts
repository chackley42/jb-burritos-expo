import AsyncStorage from '@react-native-async-storage/async-storage';


export type MenuItem = {
    id: number;
    name: string;
    price: number;
    calories: number;
    description: string;
    image: string; // You can use string to represent the image URL or file path
  };
  
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
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/breakfastBurrito.jpeg',
      },
      // Add more burrito items here
      {
        id: 2,
        name: 'Bean and Cheese Burrito',
        price: 3.50,
        calories: 320,
        description: 'Made with fresh tortilla, bean and cheese',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/beanAndCheeseBurrito.jpeg',
      },
      {
        id: 3,
        name: 'Veggie Burrito',
        price: 3.50,
        calories: 390,
        description: 'Made with fresh tortilla, rice, beans, tomatoes, corn and cheese.',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/veggieBurrito.jpeg',
      },
      {
        id: 9,
        name: 'Virtual Burrito',
        price: 0.00,
        calories: 0,
        description: 'Worth as much as an NFT',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/nftMan.jpg',
      },
    ],
    sides: [
      {
        id: 4,
        name: 'Fries',
        price: 2.00,
        calories: 250,
        description: 'Made with fresh potatoes, and salt.',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/fries.jpeg',
      },
      // Add more side items here
      {
        id: 5,
        name: 'Bacon',
        price: 2.00,
        calories: 250,
        description: 'Made from fresh pork and fried to desired tast.',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/bacon.jpeg',
      }
    ],
    drinks: [
      {
        id: 6,
        name: 'Milk',
        price: 2.00,
        calories: 250,
        description: 'From fresh cows.',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/milk.jpeg',
      },
      // Add more drink items here
      {
        id: 7,
        name: 'Orange Juice',
        price: 2.00,
        calories: 250,
        description: 'From fresh oranges',
        image: 'https://github.com/chackley42/jb-burritos-public-images/blob/main/orangeJuice.jpeg',
      },
    ],
  };

  const storeMenuData = async () => {
    try {
      const menuDataJSON = JSON.stringify(menu);
      await AsyncStorage.setItem('menuData', menuDataJSON);
      console.log('Menu data stored in AsyncStorage.');
    } catch (error) {
      console.error('Error storing menu data in AsyncStorage:', error);
    }
  };


export default storeMenuData

  