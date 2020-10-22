import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton: React.FC = ({
  children,
  width,
  height,
  borderRadius,
  marginRight,
  alignItems,
  justifyContent,
}) => (
  <LinearGradient
    colors={['#FF9944', '#FC6076']}
    style={{
      width,
      height,
      borderRadius,
      marginRight,
      alignItems,
      justifyContent,
    }}
  >
    {children}
  </LinearGradient>
);

export default GradientButton;
