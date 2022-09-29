import { StyleSheet, Dimensions } from 'react-native';

import inputStyle from './input.style';
import containerStyle from './container.style';
import imageBackgroundStyle from './imageBackground.style';
import logoStyle from './logo.style';
import buttonStyle from './button.style';
import titleStyle from './title.style';
import textStyle from './text.style';

export {
  inputStyle,
  containerStyle,
  imageBackgroundStyle,
  logoStyle,
  buttonStyle,
  titleStyle,
  textStyle,
};

// export const buttonStyle = StyleSheet.create({
//   width: '80%',
//   marginTop: 20,
// });

export const logoImageStyle = StyleSheet.create({
  marginBottom: 30,
  width: 200,
  height: 200,
});

export const inputTextStyle = StyleSheet.create({
  outer: {
    width: '80%',
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  inner: {
    fontSize: 16,
  },
});

// export const titleStyle = StyleSheet.create({
//   width: '80%',
// });

// export const titleTextStyle = StyleSheet.create({
//   fontSize: 18,
// });

export const hyperLinkStyle = StyleSheet.create({
  color: 'blue',
});

export const registerStyle = StyleSheet.create({
  marginTop: 10,
});

export const centerContentStyle = StyleSheet.create({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 150,
  paddingBottom: 50,
});
