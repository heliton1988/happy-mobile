import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import mapMarkerImg from '../../assets/map-marker.png';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: string;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

const OrphanageDetails: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const route = useRoute();
  const { id } = route.params as OrphanageParams;

  useEffect(() => {
    async function loadOrphanageData() {
      const response = await api.get<Orphanage>(`orphanages/${id}`);

      const orphanageData = response.data;

      setOrphanage(orphanageData);
    }

    loadOrphanageData();
  }, [id]);

  function handleOpenRouteGoogleMap() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`,
    );
  }

  if (!orphanage) return <Text>Loading...</Text>;

  console.log(orphanage.images);

  const { images } = orphanage;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <ScrollView horizontal pagingEnabled>
            {images.map(image => (
              <Image
                key={image.id}
                style={styles.image}
                source={{
                  uri: image.url,
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailContainerTitle}>{orphanage.name}</Text>
          <Text style={styles.detailContainerDescription}>
            {orphanage.about}
          </Text>
        </View>

        <View style={styles.main}>
          <View style={styles.mapContainer}>
            <View style={styles.mapWrapper}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
                }}
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
              >
                <Marker
                  icon={mapMarkerImg}
                  calloutAnchor={{
                    x: 2.7,
                    y: 0.8,
                  }}
                  coordinate={{
                    latitude: orphanage.latitude,
                    longitude: orphanage.longitude,
                  }}
                />
              </MapView>
            </View>

            <RectButton
              style={styles.routesContainer}
              onPress={handleOpenRouteGoogleMap}
            >
              <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
            </RectButton>
          </View>

          <View style={styles.separator} />

          <View style={styles.instructionContainer}>
            <Text style={styles.instructionContainerTitle}>
              Instruções para visita
            </Text>
            <Text style={styles.instructionContainerDescription}>
              {orphanage.instructions}
            </Text>
          </View>

          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <EvilIcons name="clock" size={40} color="#2AB5D1" />
              <Text style={styles.textHour}>{orphanage.opening_hours}</Text>
            </View>

            {orphanage.open_on_weekends ? (
              <View style={[styles.scheduleItem, styles.scheduleItemOpen]}>
                <EvilIcons name="exclamation" size={40} color="#39CC83" />
                <Text style={styles.textWeekend}>Atendemos fim de semana</Text>
              </View>
            ) : (
              <View
                style={[styles.scheduleItem, styles.scheduleItemBorderClosed]}
              >
                <EvilIcons name="exclamation" size={40} color="#FF669D" />
                <Text style={styles.textWeekendClosed}>
                  Atendemos fim de semana
                </Text>
              </View>
            )}
          </View>

          <RectButton style={styles.button} onPress={() => {}}>
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
            <Text style={styles.buttonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </ScrollView>
    </>
  );
};

// 'https://fmnova.com.br/images/noticias/safe_image.jpg'

export default OrphanageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    height: 240,
    flex: 1,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailContainer: {
    alignItems: 'flex-start',
    padding: 20,
  },

  detailContainerTitle: {
    fontFamily: 'Nunito_700Bold',
    color: '#4D6F80',
    fontSize: 30,
  },

  detailContainerDescription: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
    fontSize: 15,
    marginTop: 20,
    lineHeight: 25,
  },

  main: {
    padding: 20,
  },

  mapContainer: {
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    backgroundColor: '#E6F7FB',
    marginTop: 20,
  },

  mapWrapper: {
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#DDE3F0',
    overflow: 'hidden',
  },

  map: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089A5',
    fontSize: 15,
  },

  separator: {
    height: 0.8,
    backgroundColor: '#D3E2E5',
    marginTop: 40,
  },

  instructionContainer: {
    marginTop: 40,
  },

  instructionContainerTitle: {
    fontFamily: 'Nunito_700Bold',
    color: '#4D6F80',
    fontSize: 24,
  },

  instructionContainerDescription: {
    marginTop: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
    lineHeight: 25,
  },

  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  scheduleItem: {
    width: 155,
    height: 155,
    padding: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#B3DAE2',
  },

  scheduleItemOpen: {
    borderColor: '#39CC83',
  },

  scheduleItemClosed: {
    borderColor: '#FDF7F9',
  },

  scheduleItemBorderClosed: {
    borderColor: '#FF669D',
  },

  textWeekendClosed: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#FF669D',
    fontSize: 15,
    marginTop: 16,
    width: 100,
  },

  textHour: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
    fontSize: 15,
    marginTop: 16,
  },

  textWeekend: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#37C77F',
    fontSize: 15,
    marginTop: 16,
    width: 100,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginTop: 40,
    marginBottom: 32,
    borderRadius: 20,
    backgroundColor: '#3CDC8C',
  },

  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 16,
  },
});
