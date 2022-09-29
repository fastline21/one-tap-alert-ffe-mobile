import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';

const TestScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        onPress={(state) => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'Login' }],
            })
          );
        }}
        title="Go back"
      />
    </SafeAreaView>
  );
};

export default TestScreen;
