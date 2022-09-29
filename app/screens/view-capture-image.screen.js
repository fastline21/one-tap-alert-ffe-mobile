import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

// Styles
import viewMapStyle from '../styles/view-map.style';
import viewMapButtonStyle from '../styles/view-map-button.style';

const ViewCaptureImageScreen = ({ route, navigation }) => {
  const handleSubmit = () => {
    navigation.navigate('Map', {
      userType: route.params.userType,
      emergencyType: route.params.emergencyType,
    });
  };

  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Camera', params: route.params }],
      })
    );
  };

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height }}>
      <ImageBackground
        source={{ uri: route.params.imageURI }}
        style={viewMapStyle.inner}
        resizeMode="stretch"
      />
      <View style={viewMapButtonStyle.outer}>
        <TouchableOpacity onPress={handleSubmit}>
          <Avatar.Icon icon="check" style={viewMapButtonStyle.inner} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel}>
          <Avatar.Icon icon="close" style={viewMapButtonStyle.inner} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewCaptureImageScreen;
