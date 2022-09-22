import { SafeAreaView, Image, View } from 'react-native';

import { centerContentStyle, logoImageStyle } from '../styles';

export default () => {
  return (
    <SafeAreaView style={centerContentStyle}>
      <View>
        <Image
          style={logoImageStyle}
          fadeDuration={1000}
          source={require('../assets/loading-transparent.gif')}
        />
      </View>
    </SafeAreaView>
  );
};
