import { SafeAreaView, Image } from 'react-native';

import { containerStyle, logoStyle } from '../styles';
import imageBackgroundStyle from '../styles/imageBackground.style';

const Loading = () => {
  return (
    <SafeAreaView
      style={[
        containerStyle,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Image
        style={logoStyle.inner}
        fadeDuration={1000}
        source={require('./../assets/loading-transparent.gif')}
      />
    </SafeAreaView>
  );
};

export default Loading;
