import { View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useState } from 'react';
import { Button } from 'react-native-paper';

// Screens
import MainScreen from './main.screen';

// Components
import RegisterSteps from '../components/register-steps';

const RegisterScreen = ({ navigation }) => {
  const labels = [
    'Personal Information',
    'Contact Information',
    'Contact Person',
    'Front ID',
    'Back ID',
    'Selfie ID',
    'Review',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleNext = () => {
    setCurrentPosition(currentPosition + 1);
  };

  const handlePrevious = () => {
    setCurrentPosition(currentPosition - 1);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <MainScreen>
      <View>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={7}
        />
      </View>
      <View>
        <RegisterSteps
          step={currentPosition}
          next={() => handleNext()}
          previous={() => handlePrevious()}
          cancel={() => handleCancel()}
        />
      </View>
      {/* <View
        style={{
          lex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {currentPosition !== 0 ? (
          <Button onPress={handlePrevious}>Previous</Button>
        ) : (
          <Button onPress={handleCancel}>Cancel</Button>
        )}
        <Button onPress={handleNext}>Next</Button>
      </View> */}
    </MainScreen>
  );
};

export default RegisterScreen;
