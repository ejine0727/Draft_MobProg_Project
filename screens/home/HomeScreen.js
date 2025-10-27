import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuModal from "../../components/MenuModal"; // ✅ import your menu component

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Section Announcement");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // ✅ for the left menu modal

  const categories = ["Section Announcement", "Campus Announcement", "Class Wall"];

  const posts = [
    {
      id: "1",
      category: "Section Announcement",
      name: "Prof. Cuestas",
      date: "Oct 27, 2025 7:30 AM",
      message:
        "Hello, good morning! My apologies for this late notice, I am attending a Zumba workshop. I will be uploading video lectures soonest. Thank you.",
    },
    {
      id: "2",
      category: "Campus Announcement",
      name: "Prof. Christian Layson",
      date: "Oct 28, 2025 9:00 AM",
      message:
        "Zumba Fun Day! Let’s move and dance for a fitter future. All PATHFIT students are invited. 🕺💃",
      instructions: "Wear your PE uniform and bring a bottle of water.",
    },
    {
      id: "3",
      category: "Class Wall",
      name: "USTP-CDO Official Account",
      date: "Oct 29, 2025 7:00 AM",
      message: "Proper Warm-up Routine",
      image: "https://via.placeholder.com/150x100.png?text=Warm-up+Routine",
    },
  ];

  const filteredPosts = posts.filter((p) => p.category === selectedCategory);

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Ionicons name="person-circle-outline" size={36} color="#E75C1A" />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>

      <Text style={styles.message}>{item.message}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
      )}

      {item.instructions && (
        <Text style={styles.instructions}>📋 {item.instructions}</Text>
      )}

      <View style={styles.postFooter}>
        <Ionicons name="heart-outline" size={20} color="#E75C1A" />
        <Ionicons name="chatbubble-outline" size={20} color="#E75C1A" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>PATHFIT</Text>

        {/* Menu Icon */}
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Button */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedCategory}</Text>
          <Ionicons name="chevron-down-outline" size={18} color="#333" />
        </TouchableOpacity>

        {/* Dropdown Modal */}
        <Modal
          visible={dropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdownMenu}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedCategory === cat && {
                        color: "#E75C1A",
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Posts */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* ✅ Menu Modal Component */}
      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E75C1A",
    letterSpacing: 1.5,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E75C1A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    width: "75%",
    borderRadius: 8,
    paddingVertical: 6,
    elevation: 6,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  postCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    color: "#666",
    fontSize: 12,
  },
  message: {
    color: "#333",
    marginBottom: 10,
  },
  instructions: {
    color: "#333",
    fontStyle: "italic",
    fontSize: 13,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 6,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    gap: 10,
  },
});
