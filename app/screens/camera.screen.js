import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';

// Screens
import MainScreen from './main.screen';

// Constants
import { RATIOS } from '../constants/ratios';

const CameraScreen = ({ route, navigation }) => {
  const initialRatio = RATIOS.DEFAULT;

  const [camera, setCamera] = useState(null);
  const [ratio, setRatio] = useState(initialRatio);
  const [type, setType] = useState(CameraType.back);
  const [imageURI, setImageURI] = useState(null);
  const [imagePadding, setImagePadding] = useState(0);
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const prepareRatio = async () => {
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  const handleCameraReady = async () => {
    await prepareRatio();
  };

  const handleToggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleCapturePicture = async () => {
    const data = await camera.takePictureAsync();
    navigation.navigate('ViewCaptureImage', {
      imageURI: data.uri,
      height: Dimensions.get('window').height,
      emergencyType: route.params.emergencyType,
      userType: route.params.userType,
    });
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <MainScreen>
      <View style={{ height: Dimensions.get('window').height }}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
          onCameraReady={handleCameraReady}
          ratio={ratio}
        >
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              flexDirection: 'row',
              flex: 1,
              margin: 64,
            }}
          >
            <TouchableOpacity onPress={handleClose}>
              <Avatar.Icon
                icon="close"
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => await handleCapturePicture()}
            >
              <Avatar.Icon
                icon="camera"
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleCameraType}>
              <Avatar.Icon
                icon="camera-party-mode"
                style={{ backgroundColor: 'transparent' }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </MainScreen>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
