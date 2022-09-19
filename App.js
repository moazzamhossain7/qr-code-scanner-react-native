import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/Home';
import ScanScreen from './src/Scan';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    const [fontsLoaded] = useFonts({
        'Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
        'SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
        'Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    });
  
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Image
            style={{ width: 30, height: 30 }}
            source={require('./assets/logo.png')}
        />
        <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 20, fontFamily: fontsLoaded.Bold}}> 
                Scanner App 
            </Text>
            <Text style={{fontSize: 12, fontFamily: fontsLoaded.Medium}}> 
                Read data from Barcode & Qr-Code. 
            </Text>
        </View>
    </View>
  );
}

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
                <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ 
                        headerShadowVisible: false, 
                        headerTitle: (props) => <LogoTitle {...props} /> 
                    }} 
                />
                <Stack.Screen 
                    name="Scan" 
                    component={ScanScreen} 
                    options={{
                        headerShown: false, 
                    }} 
                />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
