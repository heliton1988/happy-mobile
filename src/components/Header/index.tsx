import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header = ({ title, showCancel = true }: HeaderProps) => {
  const navigation = useNavigation();

  function handleNavigationToBack() {
    navigation.goBack();
  }

  function handleNavigationToHome() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={handleNavigationToBack}>
        <Feather name="arrow-left" size={20} color="#fff" />
      </BorderlessButton>

      <Text style={styles.text}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleNavigationToHome}>
          <Feather name="x" size={20} color="#ad4067" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FF5A79',
    borderBottomWidth: 1,
    borderColor: '#f05673',
    paddingTop: 44,

    elevation: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: '#F9FAFC',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
  },
});
