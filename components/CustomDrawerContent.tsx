import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_NAME, APP_DESC } from '../constants/appinfo';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }} // vamos nós mesmos controlar o topo
    >
      {/* Cabeçalho com logo + textos */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image
          source={require('../assets/images/logo-IMT.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.titleBox}>
          <Text style={styles.appName} numberOfLines={1}>{APP_NAME}</Text>
          <Text style={styles.appDesc} numberOfLines={1}>{APP_DESC}</Text>
        </View>
      </View>

      {/* Lista de itens do Drawer */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  titleBox: {
    flex: 1,
    minWidth: 0, // para truncar corretamente com numberOfLines
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A2540',
  },
  appDesc: {
    marginTop: 2,
    fontSize: 14,
    color: '#6B7280',
  },
});