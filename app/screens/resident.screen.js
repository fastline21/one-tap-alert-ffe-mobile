import {
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { APP_SERVER_URL } from '@env';

import { getUserInfo } from '../actions/usersAction';
import { getAllEmergencyTypes } from '../actions/emergencyTypesAction';
import { createEmergency } from '../actions/emergenciesAction';

import { getLocation } from '../utilities/location';
import { removeToken } from '../utilities/token';

import { logoImageStyle } from '../styles';

import LoadingComponent from '../components/loading.component';

export default ({ route, navigation }) => {
  const initialUserInfo = {
    firstName: null,
    lastName: null,
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [loading, setLoading] = useState(true);

  const { firstName, lastName } = userInfo;

  const handleActionAlert = async (name) => {
    const emergencyTypes = await getAllEmergencyTypes();

    const { _id: emergency_type_id } = emergencyTypes.find(
      (element) => element.name === name
    );

    const { longitude, latitude } = location.coords;

    const body = {
      emergency_type_id,
      longitude,
      latitude,
    };

    await createEmergency(body);
  };

  useEffect(() => {
    getLocation().then((data) => setLocation(data));
    getUserInfo()
      .then((data) => {
        const {
          user_info: { first_name, last_name },
        } = data;
        setUserInfo({ firstName: first_name, lastName: last_name });
        setLoading(false);
      })
      .catch((error) => alert(error.message));
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={logoImageStyle}
          fadeDuration={1000}
          source={require('./../assets/logo.png')}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.nameText}>
          Hi {`${firstName} ${lastName}` || 'User'}!
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          title="Fire"
          onPress={async () => await handleActionAlert('Fire')}
          color="crimson"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Flood"
          onPress={async () => await handleActionAlert('Flood')}
          color="khaki"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Earthquake"
          // onPress={async () => await handleActionAlert('Earthquake')}
          onPress={() => navigation.navigate('Camera')}
          color="saddlebrown"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Logout"
          onPress={async () => {
            await removeToken('token');
            // navigation.goBack();
            navigation.navigate('Login');
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    marginTop: 20,
  },
  image: {
    marginBottom: 30,
  },
  name: {
    marginTop: 20,
  },
  nameText: {
    fontSize: 30,
  },
});
