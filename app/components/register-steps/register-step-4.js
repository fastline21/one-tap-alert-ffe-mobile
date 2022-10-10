import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';

// Components
import CameraView from '../camera.component';

const RegisterStep5 = ({ nextStep, previousStep, registerStep }) => {
  const handlePrevious = () => {
    previousStep();
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <CameraView />
      <View
        style={{
          lex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button onPress={handlePrevious}>Previous</Button>
        <Button onPress={handleNext}>Next</Button>
      </View>
    </>
  );
};

export default RegisterStep5;
