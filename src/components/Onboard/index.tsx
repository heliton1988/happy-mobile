import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import fisrtLogo from '../../assets/logo01.png';
import secondLogo from '../../assets/logo02.png';

import GradientButton from '../GradientButton';

const NextButton: React.FC = ({ ...props }) => (
  <GradientButton height={56} width={56} borderRadius={20} marginRight={20}>
    <RectButton style={styles.button} {...props}>
      <Feather name="chevron-right" size={30} color="#fff" />
    </RectButton>
  </GradientButton>
);

const DoneButton: React.FC = ({ ...props }) => {
  const natigation = useNavigation();

  return (
    <GradientButton height={56} width={56} borderRadius={20} marginRight={20}>
      <RectButton
        {...props}
        style={styles.button}
        onPress={() => natigation.navigate('OrphanagesMap')}
      >
        <Feather name="chevron-right" size={30} color="#fff" />
      </RectButton>
    </GradientButton>
  );
};

const Square: React.FC = ({ selected }) => {
  let backgroundColor;
  if (selected) {
    backgroundColor = '#FF9944';
  } else {
    backgroundColor = 'rgba(255, 153, 68, 0.3)';
  }

  return selected ? (
    <View
      style={{
        width: 32,
        height: 6,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  ) : (
    <View
      style={{
        width: 8,
        height: 6,
        borderRadius: 4,
        marginHorizontal: 6,
        backgroundColor,
      }}
    />
  );
};

const Onboard: React.FC = () => (
  <Onboarding
    containerStyles={{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      paddingHorizontal: 20,
      alignItems: 'stretch',
    }}
    controlStatusBar={false}
    bottomBarColor="#fff"
    bottomBarHeight={80}
    showSkip={false}
    DotComponent={Square}
    NextButtonComponent={NextButton}
    DoneButtonComponent={DoneButton}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image style={styles.image} source={fisrtLogo} />,
        title: 'Leve felicidade para o mundo',
        titleStyles: {
          fontSize: 48,
          color: '#0089A5',
          fontFamily: 'Nunito_800ExtraBold',
          lineHeight: 48,
          textAlign: 'left',
          width: 217,
        },
        subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
        subTitleStyles: {
          color: '#5C8599',
          fontSize: 20,
          textAlign: 'left',
          marginBottom: 48,
          width: 234,
        },
      },

      {
        backgroundColor: '#fff',
        image: <Image source={secondLogo} />,
        title: 'Escolha um orfanato no mapa e faça uma visita',
        titleStyles: {
          fontSize: 30,
          color: '#0089A5',
          fontFamily: 'Nunito_800ExtraBold',
          lineHeight: 36,
          alignSelf: 'flex-end',
          textAlign: 'right',
          width: 253,
        },
        subtitle: '',
      },
    ]}
  />
);

export default Onboard;

const styles = StyleSheet.create({
  image: {
    marginTop: -30,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
