import React from 'react';
import { Image } from 'react-native';

const ImageComponent = ({ imageName }) => {
  // Check if imageName is provided
  if (!imageName || imageName === null) {
    imageName = 'nftMan.jpg'; // or you can return a default image or some placeholder
  }

  // Assuming your images are stored in the assets folder
  const imagePath = `../../../../assets/${imageName}`;

  return <Image source={{ uri: imagePath }} style={{ width: 100, height: 100 }} />;
};

export default ImageComponent;
