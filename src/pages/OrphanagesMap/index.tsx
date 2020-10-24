import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy,
} from 'expo-location';

import api from '../../services/api';

import GradientButton from '../../components/GradientButton';
import mapMarkerImg from '../../assets/map-marker.png';
import positionMap from '../../assets/position.png';

import AnimatedLoading from '../../components/AnimatedLoading';

interface Position {
  latitude: number;
  longitude: number;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [location, setLocation] = useState<Position | null>(null);
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Get initial position of user
  useEffect(() => {
    async function loadLocation() {
      const { status } = await requestPermissionsAsync();

      if (status === 'granted') {
        const { coords } = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.BestForNavigation,
        });

        const position = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setLocation(position);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

    loadLocation();
  }, []);

  // Load orphanages positions
  useFocusEffect(() => {
    async function loadOrphanages() {
      const response = await api.get('orphanages');

      const orphanagesData = response.data;

      setOrphanages(orphanagesData);
    }

    loadOrphanages();
  });

  function handleNavigateToDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToData() {
    navigation.navigate('SelectPosition');
  }

  return loading ? (
    <AnimatedLoading />
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker
            icon={positionMap}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
          {orphanages.map((orphanage: Orphanage) => (
            <Marker
              key={orphanage.id}
              icon={mapMarkerImg}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigateToDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {orphanages.length} orfanatos encontrados
          </Text>

          <GradientButton
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
          >
            <RectButton
              style={styles.createOrphanageButton}
              onPress={handleNavigateToData}
            >
              <Feather name="plus" size={20} color="#fff" />
            </RectButton>
          </GradientButton>
        </View>
      </View>
    </>
  );
};

export default OrphanagesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3,
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    padding: 19,
    borderRadius: 20,
  },

  loadingText: {
    color: '#0089a5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// 15c3d6
