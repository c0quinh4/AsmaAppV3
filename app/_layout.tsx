import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomDrawerContent from '../components/CustomDrawerContent';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="painel"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => <DrawerToggleButton tintColor="#000" />,
        }}
      >
        {/* Itens visíveis */}
        <Drawer.Screen
          name="painel"
          options={{
            title: 'Painel',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="speedometer-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="insights"
          options={{
            title: 'Insights',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="analytics-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="sensores"
          options={{
            title: 'Sensores',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="sensors" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="assistente-ia"
          options={{
            title: 'Assistente IA',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="chatbubbles-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="configuracoes"
          options={{
            title: 'Configurações',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Rotas internas (ocultas no menu) */}
        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: { display: 'none' },
            drawerLabel: () => null,
            title: '',
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: { display: 'none' },
            drawerLabel: () => null,
            title: '',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
