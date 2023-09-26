//Root Layout
//Uses Stack
import { Stack } from 'expo-router';
import ProfileBtn from '../components/ProfileBtn';
import { Image } from 'react-native';
import LogoBurrito from '../components/Logo';

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ 
                headerShown: false,
                headerLeft: () => <LogoBurrito/>,
                headerRight: () => <ProfileBtn></ProfileBtn>, 
                headerTitle: '',
                headerStyle: {
                    backgroundColor: "#F8E435"
                }}}/>
        </Stack>
    )
}

export default StackLayout;