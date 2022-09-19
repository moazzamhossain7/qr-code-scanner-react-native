import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Scan() {
    const [fontsLoaded] = useFonts({
        'Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
        'SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    });

    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Scanning...');
    const [hasPermission, setHasPermission] = useState(null);

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data);
    };

    const handleScan = () => {
        setText('Scanning again...');
        setScanned(false);
    }

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission...</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera!</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    // Return the View
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{height: 600, width: 400}} 
                />
            </View>
            <Text style={[styles.text, {fontFamily:fontsLoaded.Medium}]}>
                {text}
            </Text>

            {scanned && (
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleScan()} style={styles.button}>
                    <Ionicons name="qr-code-outline" size={24} color="black" style={styles.icon} />
                    <Text style={{fontFamily:fontsLoaded.Bold, fontSize: 16, textTransform: 'uppercase', marginLeft: 10}}>Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        // borderWidth: 1,
        // borderColor: '#e1e4e8',
        // borderRadius: 6,
        // width: 300,
        // padding: 10,
        // backgroundColor: '#fff'
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        // backgroundColor: 'tomato'
    },
    button: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#e1e4e8',
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});