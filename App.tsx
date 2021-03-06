import React from 'react';
import { Text } from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_600SemiBold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

import Routes from './src/routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Loaging...</Text>;
  }

  return <Routes />;
};

export default App;

// "react-native-web": "~0.13.7",
