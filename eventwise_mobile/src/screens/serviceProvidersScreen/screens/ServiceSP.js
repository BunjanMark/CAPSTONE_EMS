import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const servicesData = [
  {
    id: '1',
    name: 'Service A',
    image: require('../assets/service1.png'),
    price: '₱10,000',
    details: 'Includes feature 1, feature 2, and feature 3.',
  },
  {
    id: '2',
    name: 'Service B',
    image: require('../assets/service2.png'),
    price: '₱15,000',
    details: 'Includes feature A, feature B, and feature C.',
  },
  {
    id: '3',
    name: 'Service C',
    image: require('../assets/service1.png'),
    price: '₱200,000',
    details: 'Includes feature X, feature Y, and feature Z.',
  },
  {
    id: '4',
    name: 'Service D',
    image: require('../assets/service2.png'),
    price: '₱25,000',
    details: 'Includes feature 1, feature 2, and feature 3.',
  },
  {
    id: '5',
    name: 'Service E',
    image: require('../assets/service1.png'),
    price: '₱30,000',
    details: 'Includes feature A, feature B, and feature C.',
  },
  {
    id: '6',
    name: 'Service F',
    image: require('../assets/service2.png'),
    price: '₱3,500',
    details: 'Includes feature X, feature Y, and feature Z.',
  },
];

const ServiceSP = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigation = useNavigation(); // Get the navigation prop

  const renderServiceItem = ({ item }) => {
    if (item.isBrokenBox) {
      return (
        <TouchableOpacity
          style={styles.brokenBox}
          onPress={() => navigation.navigate('ServicePortfolioSP')} // Navigate to CreateServiceSP
        >
          <Text style={styles.brokenBoxText}>Add Service</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedService(item);
          setModalVisible(true);
        }}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  // Insert the broken box as the first item
  const dataWithBrokenBox = [
    { id: 'broken', isBrokenBox: true }, // This represents the broken line box
    ...servicesData,
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Services</Text>
      <FlatList
        data={dataWithBrokenBox}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
      />
</ScrollView>
      {/* Modal for service details */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {selectedService && (
              <>
                <Text style={styles.modalHeader}>{selectedService.name}</Text>
                <Image source={selectedService.image} style={styles.modalImage} />
                <Text style={styles.modalPrice}>{selectedService.price}</Text>
                <Text style={styles.modalDetails}>{selectedService.details}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  scrollViewContent: {
paddingBottom: 60
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  brokenBox: {
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
    padding: 80,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFF5F5',
  },
  brokenBoxText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    position: 'relative',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ServiceSP;
