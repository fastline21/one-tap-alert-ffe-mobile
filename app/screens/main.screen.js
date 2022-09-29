import {
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';

import { centerContentStyle } from '../styles';
import { containerStyle, imageBackgroundStyle } from '../styles';

export default ({ children }) => {
  const [contentBottom, setContentBottom] = useState(0);
  return (
    <SafeAreaView style={containerStyle}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={imageBackgroundStyle}
      />
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        extraScrollHeight={150}
        enableResetScrollToCoords
        onKeyboardWillHide={() => setContentBottom(0)}
        onKeyboardWillShow={() => setContentBottom(200)}
        contentInset={{ bottom: contentBottom }}
      >
        {children}
      </KeyboardAwareScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
