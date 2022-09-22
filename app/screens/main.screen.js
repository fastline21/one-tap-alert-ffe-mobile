import {
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import { imageBackgroundStyle, centerContentStyle } from '../styles';

export default ({ children }) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={imageBackgroundStyle}
      >
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={centerContentStyle}
          >
            {children}
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
