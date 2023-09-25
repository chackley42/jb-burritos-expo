//Root Layout
//Uses Stack
import { Stack } from 'expo-router';
import ProfileBtn from '../components/ProfileBtn';
import { Image } from 'react-native';
import Logo from '../components/Logo';

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ 
                headerShown: true,
                headerLeft: () => <Logo/>,
                headerRight: () => <ProfileBtn></ProfileBtn>, 
                headerTitle: '',
                headerStyle: {
                    backgroundColor: "#F8E435"
                }}}/>
        </Stack>
    )
}

export default StackLayout;