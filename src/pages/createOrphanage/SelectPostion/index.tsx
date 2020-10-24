import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MapEvent } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarkerImg from '../../../assets/map-marker.png';
import cursorImg from '../../../assets/cursor.png';

import TouchInstruction from '../../../components/TouchInstruction';

// const Cursor: React.FC = () => {
//   const navigation = useNavigation();
//   const [Index, setIndex] = useState(15);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, [navigation]);

//   return (
//     <>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View
//         onTouchEndCapture={evt => {
//           setIndex(0);
//           return true;
//         }}
//         // onMoveShouldSetResponder={evt => {
//         //   setIndex(0);
//         //   return true;
//         // }}
//         style={{
//           flex: 1,
//           width: Dimensions.get('window').width,
//           height: Dimensions.get('screen').height,
//           position: 'absolute',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: 'rgba(21, 182, 214, 0.7)',
//           zIndex: Index,
//         }}
//       >
//         <Image source={cursorImg} style={{ resizeMode: 'contain' }} />

//         <View>
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 24,
//               lineHeight: 34,
//               fontFamily: 'Nunito_800ExtraBold',
//               textAlign: 'center',
//               width: 203,
//             }}
//           >
//             Toque no mapa para adicionar um orfanato
//           </Text>
//         </View>
//       </View>
//     </>
//   );
// };

interface Position {
  latitude: number;
  longitude: number;
}

const SelectPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNavigationToForm(markPosition: Position) {
    navigation.navigate('OrphanageData', { markPosition });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <TouchInstruction />
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
    zIndex: 5,
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
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
