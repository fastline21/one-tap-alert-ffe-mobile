import { View, Image, Text, Button, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Unused vars
import {
  logoImageStyle,
  inputTextStyle,
  hyperLinkStyle,
  // titleStyle,
  titleTextStyle,
  registerStyle,
} from '../styles';

// Screens
import MainScreen from './main.screen';

// Actions
import { loginUser, authUser } from '../redux/actions/auth.action';

// Components
import LoadingComponent from '../components/loading.component';

// Styles
import {
  inputStyle,
  logoStyle,
  buttonStyle,
  titleStyle,
  textStyle,
} from '../styles';

// Utilities
import { getToken } from '../utilities/token';

const LoginScreen = ({
  navigation,
  authState: { user, loading, error },
  loginUser,
  authUser,
}) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const initialFormData = {
    username: null,
    password: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const { username, password } = formData;

  const handleChangeInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!username || !password) {
      alert('Please fill in all the required fields');
      return;
    }
    loginUser(formData);

    // Reset form data
    setFormData(initialFormData);
  };

  const checkAuthToken = async () => {
    const authToken = await getToken('auth_token');

    if (authToken) {
      await authUser();
    }
  };

  // First run
  useEffect(() => {
    checkAuthToken();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.user_type === 'Resident') {
        return navigation.navigate('Resident', {
          userID: user.user_id,
          userType: 'Resident',
        });
      }

      if (user.user_type === 'Responder') {
        return navigation.navigate('Responder', {
          userID: user.user_id,
          userType: 'Responder',
        });
      }
    }

    if (error) {
      alert(JSON.stringify(error));
    }
  }, [user, error]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <MainScreen>
      <View style={[logoStyle.outer, { paddingTop: 100 }]}>
        <Image
          style={logoStyle.inner}
          fadeDuration={1000}
          source={require('./../assets/logo.png')}
        />
      </View>
      <View style={titleStyle.outer}>
        <Text style={titleStyle.inner}>Login to your Account</Text>
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('username', value)}
          value={username}
          style={inputStyle.inner}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          ref={usernameRef}
        />
      </View>
      <View style={inputStyle.outer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChangeInput('password', value)}
          value={password}
          style={inputStyle.inner}
          ref={passwordRef}
        />
      </View>
      <View style={buttonStyle.outer}>
        <Button
          color={buttonStyle.inner.color}
          title="Login"
          onPress={handleSubmit}
        />
      </View>
      <View style={[textStyle.outer, { marginTop: 20 }]}>
        <Text>
          You don't have any account?{' '}
          <Text style={hyperLinkStyle} onPress={() => handleRegister()}>
            Register
          </Text>
        </Text>
      </View>
    </MainScreen>
  );
};

LoginScreen.propTypes = {
  authState: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, { loginUser, authUser })(LoginScreen);

// export default ({ navigation }) => {
//   const handleSubmit = async () => {
//     const { token } = await loginUser(formData);
//     storeToken('token', token);

//     const auth = await authUser();

//     if (auth.user_type === 'Resident') {
//       navigation.navigate('Resident');
//     } else if (auth.user_type === 'Responder') {
//       navigation.navigate('Responder');
//     } else {
//       alert('Unauthorized user');
//       removeToken('token');
//     }

//     setFormData(initialFormData);
//   };

//   const handleRegister = () => {
//     navigation.navigate('Register');
//   };

//   getToken('token')
//     .then(async (data) => {
//       if (data) {
//         const auth = await authUser();

//         if (auth.user_type === 'Resident') {
//           return navigation.navigate('Resident');
//         }

//         if (auth.user_type === 'Responder') {
//           return navigation.navigate('Responder');
//         }
//       }
//     })
//     .catch((error) => console.error('Error: getToken - Catch', { error }));

//   return (

//   );
// };
