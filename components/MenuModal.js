import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ added

const screenWidth = Dimensions.get('window').width;

const MenuModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current; 
  const navigation = useNavigation(); // ✅ navigation hook

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // ✅ Navigation handlers
  const handleNavigation = (screenName) => {
    onClose();
    navigation.navigate(screenName);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Dimmed background */}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        
        {/* Sliding menu */}
        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>PATHFIT</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={18} color="#555" style={styles.searchIcon} />
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            <TouchableOpacity onPress={() => handleNavigation('Home')}>
              <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigation('SectionTask')}>
              <Text style={styles.menuText}>Section Task</Text>
            </TouchableOpacity>

            <Text style={styles.menuText}>Section Announcement</Text>
            <Text style={styles.menuText}>Campus Announcement</Text>
            <Text style={styles.menuText}>My Events</Text>
            <Text style={styles.menuText}>Attendance</Text>
            <Text style={styles.menuText}>Progress</Text>
          </View>

          {/* Bottom User Info */}
          <View style={styles.profileSection}>
            <Ionicons name="person-circle-outline" size={30} color="#000" />
            <Text style={styles.username}>Ejine Mangcobihon</Text>

            <View style={styles.profileLinks}>
              <Text style={styles.link}>My Profile</Text>
              <Text style={styles.link}>Settings</Text>
              <Text style={styles.link}>Log Out</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuContainer: {
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6a00',
    fontFamily: 'monospace',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 35,
  },
  searchIcon: {
    marginLeft: 4,
  },
  menuItems: {
    marginBottom: 30,
  },
  menuText: {
    fontSize: 14,
    marginVertical: 6,
    color: '#222',
  },
  profileSection: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  username: {
    fontSize: 13,
    fontWeight: '500',
    marginVertical: 4,
  },
  profileLinks: {
    marginTop: 8,
  },
  link: {
    fontSize: 13,
    color: '#444',
    marginVertical: 2,
  },
});
