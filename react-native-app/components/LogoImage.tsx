import React from 'react';
import { View, Image } from 'react-native';

const LogoPng = ({ scale = 1 }) => {
  const imagePath = require('../assets/logo.png');

  return (
    <View style={{ width: 90 * scale, height: 60 * scale}}>
      <Image
        source={imagePath}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: undefined,
          height: undefined,
          marginBottom: 10,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default LogoPng;
