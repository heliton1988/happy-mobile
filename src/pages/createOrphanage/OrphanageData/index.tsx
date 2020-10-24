import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../../services/api';

interface PositionRequestParams {
  markPosition: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route.params);
  console.log('ImageState', images);

  const { markPosition } = route.params as PositionRequestParams;

  function toggleSwitch() {
    setOpenOnWeekends(open_on_weekends !== true);
  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      return Alert.alert('Ops! precisamos de acesso às suas fotos...');
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (pickerResult.cancelled) {
      return '';
    }

    const { uri: image } = pickerResult;

    setImages([...images, image]);

    console.log(pickerResult);
  }

  async function handleCreateOrphanage() {
    const { latitude, longitude } = markPosition;

    console.log({
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);

    Alert.alert('Cadastro realizado com sucesso!');

    navigation.navigate('OrphanagesMap');
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dados</Text>

      <View style={styles.separate} />

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        onFocus={e => styles.focus}
        value={name}
        onChangeText={text => setName(text)}
      />

      <View style={styles.labelContainer}>
        <Text style={[styles.label, { marginTop: 0 }]}>Sobre</Text>
        <Text style={styles.labelSmall}>Máximo de 300 catacteres</Text>
      </View>
      <TextInput
        multiline
        style={[styles.input, { height: 112 }]}
        value={about}
        onChangeText={text => setAbout(text)}
      />

      {/* <Text style={styles.label}>Número de Whatsapp</Text>
      <TextInput style={styles.input} /> */}

      <Text style={[styles.label, { marginTop: 24, marginBottom: 8 }]}>
        Fotos
      </Text>

      {images.map(image => (
        <View key={image} style={styles.previewContainer}>
          <Image style={styles.imagePreview} source={{ uri: image }} />
          <Feather
            name="x"
            size={20}
            color="#FF669D"
            style={{ paddingRight: 18 }}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.inputImage} onPress={handleSelectImage}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 64 }]}>Visitação</Text>

      <View style={styles.separate} />

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        multiline
        style={[styles.input, { height: 112 }]}
        value={instructions}
        onChangeText={text => setInstructions(text)}
      />

      <Text style={styles.label}>Horário das visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={hour => setOpeningHours(hour)}
      />

      <View style={styles.switchContainer}>
        <Text style={[styles.label, { marginTop: 0 }]}>
          Atende final de semana?
        </Text>
        <Switch
          style={styles.toggle}
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={toggleSwitch}
        />
      </View>

      <RectButton style={styles.button} onPress={handleCreateOrphanage}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
};

export default OrphanageData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  focus: {
    borderWidth: 1,
    borderColor: '#39CC83',
  },

  title: {
    color: '#5C8599',
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
  },

  separate: {
    backgroundColor: '#D3E2E5',
    width: '100%',
    height: 1,
    marginTop: 24,
    marginBottom: 16,
  },

  label: {
    color: '#8FA7B2',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
    marginTop: 16,
  },

  input: {
    height: 56,
    borderColor: '#D3E2E5',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 24,
    marginTop: 8,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  labelSmall: {
    fontFamily: 'Nunito_400Regular',
    color: '#8FA7B2',
    fontSize: 10,
  },

  inputImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderColor: '#96D2F0',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',

    borderWidth: 1,
    borderRadius: 20,
    borderStyle: 'dashed',
  },

  switchContainer: {
    marginTop: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  toggle: {},

  button: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#15C3D6',
    borderRadius: 20,
    height: 56,
    marginTop: 54,
    marginBottom: 40,
  },

  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#fff',
    fontSize: 15,
  },

  previewContainer: {
    height: 72,
    width: '100%',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
    backgroundColor: '#EDFFF6',
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: 'cover',
  },
});
