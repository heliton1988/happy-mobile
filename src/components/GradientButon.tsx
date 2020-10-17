import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton: React.FC = ({ children, styleProp }) => (
  <LinearGradient
    colors={['#FF9944', '#FC6076']}
    style={(styleProp, [styles.gradientButton])}
  >
    {children}
  </LinearGradient>
);

export default GradientButton;

const styles = StyleSheet.create({
  gradientButton: {
    height: 56,
    borderRadius: 20,
  },
});
