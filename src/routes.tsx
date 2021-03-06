import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onborading from './components/Onboard';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import SelectPosition from './pages/createOrphanage/SelectPostion';
import OrphanageData from './pages/createOrphanage/OrphanageData';

import Header from './components/Header';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="light-content"
    />
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#f2f3f5',
        },
      }}
    >
      <Stack.Screen name="Onboarding" component={Onborading} />

      <Stack.Screen name="OrphanagesMap" component={OrphanagesMap} />

      <Stack.Screen
        name="OrphanageDetails"
        component={OrphanageDetails}
        options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Orfanato" />,
        }}
      />

      <Stack.Screen
        name="SelectPosition"
        component={SelectPosition}
        options={{
          headerShown: true,
          header: () => <Header title="Selecione um ponto no mapa" />,
        }}
      />

      <Stack.Screen
        name="OrphanageData"
        component={OrphanageData}
        options={{
          headerShown: true,
          header: () => <Header title="Informe os dados" />,
          title: 'Adicione um orfanato',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
