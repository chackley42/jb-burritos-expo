import React from 'react';
import { View, Image } from 'react-native';

const LogoPng = ({ scale = 1 }) => {
  // Define the image source path (update as needed)
  const imagePath = require('../assets/logo.png');

  return (
    <View style={{ width: 50 * scale, height: 50 * scale}}>
      <Image
        source={imagePath}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: undefined,
          height: undefined,
          marginBottom: 15,
          resizeMode: 'contain', // Maintain aspect ratio and fit within the dimensions
        }}
      />
    </View>
  );
};

export default LogoPng;
