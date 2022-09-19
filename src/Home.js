import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home({ navigation }) {
    const [fontsLoaded] = useFonts({
        'Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
        'SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    });

    return (
        <View style={{flex: 1}}>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => navigation.navigate('Scan')}>
                    <Ionicons name="qr-code-outline" size={24} color="black" style={styles.icon} />
                    <Text 
                        style={{
                            fontFamily: fontsLoaded.SemiBold, 
                            fontSize: 18,
                            marginLeft: 10
                        }}
                    >
                        Scan Barcode/Qr-Code
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 50,
        marginHorizontal: 40,
    },
    item: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#e1e4e8',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {

    },
});
