import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('../assets/service1.png'), date: '2024-07-01', address: 'CDO', details: 'A beautiful wedding ceremony.' },
  { id: '2', title: 'Elizabeth Birthday', image: require('../assets/service1.png'), date: '2024-08-12', address: 'CDO', details: 'Celebrating Elizabeth’s special day!' },
  { id: '3', title: 'Class of 1979 Reunion', image: require('../assets/service1.png'), date: '2024-09-25', address: 'CDO', details: 'Reconnecting with old classmates.' },
  { id: '4', title: 'Corporate Party', image: require('../assets/service1.png'), date: '2024-10-30', address: 'CDO', details: 'Annual company party with fun activities.' },
  { id: '5', title: 'Annual Gala', image: require('../assets/service1.png'), date: '2024-11-15', address: 'CDO', details: 'A night of elegance and fundraising.' },
  { id: '6', title: 'New Year Celebration', image: require('../assets/service1.png'), date: '2024-12-31', address: 'CDO', details: 'Ring in the New Year with festivities.' },
  { id: '7', title: 'Music Festival', image: require('../assets/service1.png'), date: '2024-06-22', address: 'CDO', details: 'Enjoy performances from various artists.' },
  { id: '8', title: 'Art Exhibition', image: require('../assets/service1.png'), date: '2024-07-05', address: 'CDO', details: 'Showcasing local artists and their work.' },
];

const ProfileSP = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => {
        setSelectedEvent(item);
        setModalVisible(true);
      }}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/pro_pic.png')}
          style={styles.profilePicture}
        />
        <Text style={styles.nameText}>Organizer</Text>
        <Text style={styles.addressText}>Service Provider Address</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileSP')}
          >
            <Ionicons name="pencil" size={24} color="white" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.popularEventText}>Popular Events</Text>

      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsListContainer}
      />

      {/* Add padding to the bottom of the ScrollView */}
      <View style={styles.paddingBottom} />

      {selectedEvent && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedEvent(null);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedEvent(null);
                }}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Image source={selectedEvent.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
              <Text style={styles.modalDate}>{selectedEvent.date}</Text>
              <Text style={styles.modalAddress}>{selectedEvent.address}</Text>
              <Text style={styles.modalDetails}>{selectedEvent.details}</Text>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileSection: {
    borderColor: '#C2B067',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#eeba2b',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  popularEventText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailContainer: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    color: '#2A93D5',
    marginLeft: 5,
  },
  eventsListContainer: {
    paddingBottom: 20,
  },
  paddingBottom: {
    height: 60, // Set height for the bottom padding
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  modalDate: {
    fontSize: 16,
    color: '#2A93D5',
  },
  modalAddress: {
    fontSize: 16,
    color: '#2A93D5',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProfileSP;
