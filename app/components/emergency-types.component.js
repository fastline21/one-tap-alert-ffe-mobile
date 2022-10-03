import { View, TouchableOpacity, Text } from 'react-native';

// Styles
import residentButtonStyle from '../styles/resident-button.style';

const EmergencyTypes = ({ data, action }) => {
  const { handleDisaster } = action;
  const { emergencyTypes } = data;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {emergencyTypes?.map((element, index) => {
        const emergencyType = element.name.toLowerCase();
        return (
          <TouchableOpacity
            key={index}
            style={[
              residentButtonStyle.outer,
              residentButtonStyle.inner.defaultColor,
              residentButtonStyle.inner[`${emergencyType}Color`],
            ]}
            onPress={() => handleDisaster(element._id)}
          >
            <Text style={residentButtonStyle.inner.text}>{element.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default EmergencyTypes;
