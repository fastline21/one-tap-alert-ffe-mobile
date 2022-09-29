import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  inner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  outer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
