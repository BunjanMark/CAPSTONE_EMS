import React, { useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import logoWhite from "../assets/logoWhite.png";

const CustomDrawerContent = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const DropdownItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
      <Ionicons name={icon} size={20} color="black" style={styles.dropdownIcon} />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#FFFF", "#FFC42B"]}
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }} // Bottom
      style={styles.drawerContent}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.drawerHeader}>
          <Image source={logoWhite} style={styles.logo} resizeMode="center" />
        </View>
        <View style={styles.drawerSeparator} />
        
        {/* Home Drawer Item */}
        
        
        {/* Event Details Drawer Item */}
        <DrawerItem
          label="Event Details"
          icon={({ focused, color, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate("EventsSP")}
        />

        {/* About Drawer Item */}
        <DrawerItem
          label="About"
          icon={({ focused, color, size }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate("AboutMeSP")}
        />
        
        {/* User Info Section with Dropdown */}
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.userName}>Avril Carasco</Text>
          <Ionicons name="chevron-down" size={20} color="black" style={styles.userInfoIcon} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <DropdownItem
              icon="person"
              label="Profile"
              onPress={() => {
                setDropdownVisible(false);
                props.navigation.navigate("ProfileSP");
              }}
            />
            <DropdownItem
              icon="settings"
              label="Settings"
              onPress={() => {
                setDropdownVisible(false);
                props.navigation.navigate("SettingSP");
              }}
            />
            <DropdownItem
              icon="log-out"
              label="Logout"
              onPress={() => {
                setDropdownVisible(false);
                // Handle logout functionality here
              }}
            />
          </View>
        )}
      </DrawerContentScrollView>
      
      {/* Footer Content */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <View style={styles.socialIcons}>
          <Ionicons name="logo-facebook" size={24} color="#3b5998" />
          <Ionicons name="logo-twitter" size={24} color="#00acee" />
          <Ionicons name="logo-instagram" size={24} color="#C13584" />
        </View>
        <Text style={styles.footerText}>© 2024 Your Company</Text>
      </View>
    </LinearGradient>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  drawerHeader: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    width: 500,
    height: 600,
    resizeMode: "contain",
  },
  drawerSeparator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    flex: 1,
    textAlign: 'center',
  },
  userInfoIcon: {
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginVertical: 5,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginVertical: 10,
  },
});