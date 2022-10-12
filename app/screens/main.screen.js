import { ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import { containerStyle, imageBackgroundStyle } from '../styles';

// Actions
import { getAllEmergencyTypes } from '../redux/actions/emergency-types.action';

const MainScreen = ({ isAuth = false, children, getAllEmergencyTypes }) => {
  const [contentBottom, setContentBottom] = useState(0);

  useEffect(() => {
    getAllEmergencyTypes();
  }, []);

  return (
    <SafeAreaView style={containerStyle}>
      {!isAuth && <ImageBackground
        source={require('../assets/background.png')}
        style={imageBackgroundStyle}
      />}
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

MainScreen.propTypes = {
  getAllEmergencyTypes: PropTypes.func.isRequired,
};

export default connect(null, { getAllEmergencyTypes })(MainScreen);
