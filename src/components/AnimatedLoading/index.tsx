import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';

import logo from '../../assets/logo.png';

const AnimatedLoading: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animatedImg = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1900,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedImg, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, animatedImg]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0CC2CA" />
      <Animated.View
        style={[
          styles.animatedView,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Animated.Image
          source={logo}
          style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            width: 10,
            height: 10,
            resizeMode: 'contain',
            transform: [
              {
                translateX: animatedImg.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 180],
                }),
              },
              {
                translateY: animatedImg.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 370],
                }),
              },
              {
                scaleX: animatedImg.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 13],
                }),
              },
              {
                scaleY: animatedImg.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 12.5],
                }),
              },
            ],
          }}
        />
      </Animated.View>
    </View>
  );
};

export default AnimatedLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CC2CA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  animatedView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },

  fadingContainer: {
    padding: 10,
  },
});
// style={{
//   position: 'absolute',
//   left: 40,
//   top: 100,
//   height: 20,
//   width: 20,
//   transform: [
//       {
//           translateX: this.animatedValue.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 120]
//           })
//       },
//       {
//           translateY: this.animatedValue.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 25]
//           })
//       },
//       {
//           scaleX: this.animatedValue.interpolate({
//               inputRange: [0, 1],
//               outputRange: [1, 15]
//           })
//       },
//       {
//           scaleY: this.animatedValue.interpolate({
//               inputRange: [0, 1],
//               outputRange: [1, 12.5]
//           })
//       }
//   ]
// }}
