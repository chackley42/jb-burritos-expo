import React from 'react';
import { Text } from 'react-native';
import { Link } from 'expo-router';

const ProfileBtn = () => {
  return (
    <Link href="/home/profile">
      <Text>ProfileBtn</Text>
    </Link>
  );
};

export default ProfileBtn;
