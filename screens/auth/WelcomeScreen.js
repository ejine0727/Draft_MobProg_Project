import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/splash-icon.png')} // adjust path if needed
      style={styles.background}
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>PATHFIT</Text>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.joinText}>Join for free</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E75C1A',
    opacity: 0.85,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 100,
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  joinButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  joinText: {
    color: '#E75C1A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
});
