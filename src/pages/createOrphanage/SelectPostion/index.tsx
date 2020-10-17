import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MapEvent } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import GradientButton from '../../../components/GradientButon';
import mapMarkerImg from '../../../assets/map-marker.png';

interface Position {
  latitude: number;
  longitude: number;
}

const SelectPosition: React.FC = () => {
  const nativation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNavigationToForm(markPosition: Position) {
    nativation.navigate('OrphanageData', { markPosition });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.701093,
          longitude: -43.531849,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton
          style={styles.button}
          onPress={() => handleNavigationToForm(position)}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </RectButton>
      )}
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
    elevation: 3,
  },

  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#fff',
  },
});

export default SelectPosition;
