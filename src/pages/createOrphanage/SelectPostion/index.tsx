import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarkerImg from '../../../assets/map-marker.png';

const SelectPosition: React.FC = () => {
  const nativation = useNavigation();

  function handleNavigationToForm() {
    nativation.navigate('OrphanageData');
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.701093,
          longitude: -43.531849,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarkerImg}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -22.701093,
            longitude: -43.531849,
          }}
        />
      </MapView>

      <RectButton style={styles.button} onPress={handleNavigationToForm}>
        <Text style={styles.buttonText}>Próximo</Text>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  button: {
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#15C3D6',
    borderRadius: 20,
    height: 56,
    left: 20,
    right: 20,
    bottom: 40,
  },

  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#fff',
  },
});

export default SelectPosition;
