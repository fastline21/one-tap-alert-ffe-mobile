import { View } from 'react-native';

// Styles
import logoStyle from '../styles/logo.style';

const Logo = () => {
  return (
    <View style={[logoStyle.outer, { paddingTop: 100 }]}>
      <Image
        style={logoStyle.inner}
        fadeDuration={1000}
        source={require('../assets/logo.png')}
      />
    </View>
  );
};

export default Logo;
