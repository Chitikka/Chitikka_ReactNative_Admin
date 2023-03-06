import React, { useState } from 'react'
import { View, Alert, Image, StyleSheet, Text } from 'react-native'
import Button from '../ui/Button'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Colors } from '../../constants/styles'

const ImagePicker = ({onPickImage}) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState()

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        return true;
    }


    const takeImageHandler = async () => {
        try {
            const hasPermission = await verifyPermissions();

            if (!hasPermission) {
                return;
            }

            const pickedImage = await launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            })
            console.log(pickedImage);
            setImage(pickedImage.assets[0].uri)
            onPickImage(pickedImage.assets[0].uri)
        } catch (e) {
            console.log('Error', e)
        }
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (image) {
        imagePreview = <Image style={styles.image} source={{ uri: image }} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <Button onPress={takeImageHandler}>Take Photo of Clothing!</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImagePicker

