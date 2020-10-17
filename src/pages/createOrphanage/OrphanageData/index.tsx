import React from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RawButton, RectButton } from 'react-native-gesture-handler';

const OrphanageData: React.FC = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Dados</Text>

    <View style={styles.separate} />

    <Text style={styles.label}>Nome</Text>
    <TextInput style={styles.input} />

    <View style={styles.labelContainer}>
      <Text style={[styles.label, { marginTop: 0 }]}>Sobre</Text>
      <Text style={styles.labelSmall}>Máximo de 300 catacteres</Text>
    </View>
    <TextInput style={[styles.input, { height: 112 }]} multiline />

    <Text style={styles.label}>Número de Whatsapp</Text>
    <TextInput style={styles.input} />

    <Text style={[styles.label, { marginTop: 24 }]}>Fotos</Text>
    <TouchableOpacity style={styles.inputImage}>
      <Feather name="plus" size={24} color="#15B6D6" />
    </TouchableOpacity>

    <Text style={[styles.title, { marginTop: 64 }]}>Visitação</Text>

    <View style={styles.separate} />

    <Text style={styles.label}>Instruções</Text>
    <TextInput style={[styles.input, { height: 112 }]} multiline />

    <Text style={styles.label}>Horário das visitas</Text>
    <TextInput style={styles.input} />

    <View style={styles.switchContainer}>
      <Text style={[styles.label, { marginTop: 0 }]}>
        Atende final de semana?
      </Text>
      <Switch
        style={styles.toggle}
        thumbColor="#fff"
        trackColor={{ false: '#ccc', true: '#39CC83' }}
      />
    </View>

    <RectButton style={styles.button}>
      <Text style={styles.buttonText}>Enviar</Text>
    </RectButton>
  </ScrollView>
);

export default OrphanageData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

    marginTop: 8,
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
});
