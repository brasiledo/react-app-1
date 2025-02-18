import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { appImages } from '../../services';

export default function Header({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <ImageBackground source={appImages.top_header} style={styles.header}>
      <MaterialIcons name='menu' size={28}  style={styles.icon} />
      <View style={styles.headerTitle}>
        {/* <Image source={require('../assets/heart_logo.png')} style={styles.headerImage} /> */}
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    flexDirection: 'row'
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
});