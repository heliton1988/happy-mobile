import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import cursorImg from '../../assets/cursor.png';

const Cursor: React.FC = () => {
  const navigation = useNavigation();
  const [Index, setIndex] = useState(15);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  function handleLayoutEffect() {
    navigation.setOptions({
      headerShown: true,
    });
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient colors={['#15B6D6', '#15D6D6']}>
        <View
          onTouchEndCapture={() => {
            handleLayoutEffect();
            setIndex(0);
            return true;
          }}
          // onMoveShouldSetResponder={evt => {
          //   setIndex(0);
          //   return true;
          // }}
          style={[
            styles.container,
            {
              zIndex: Index,
            },
          ]}
        >
          <Image source={cursorImg} style={{ resizeMode: 'contain' }} />

          <View>
            <Text style={styles.title}>
              Toque no mapa para adicionar um orfanato
            </Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Cursor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 182, 214, 0.7)',
  },

  title: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 34,
    fontFamily: 'Nunito_800ExtraBold',
    textAlign: 'center',
    width: 203,
  },
});
