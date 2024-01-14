import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import Pdf from 'react-native-pdf';

const MyRequests = ({ navigation, user }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("id user :" + user.id);

  useEffect(() => {
    // Fetch data from the API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.100.8:8085/demandes_par_utilisateur/${user.id}`);
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleItemPress = (item) => {
    // Set the selected item and show the modal
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    // Close the modal
    setModalVisible(false);
  };

  const renderModalContent = () => {
    if (!selectedItem) {
      return null;
    }

    const image1Data = selectedItem.piece_jointe_1;
    const image2Data = selectedItem.piece_jointe_2;
    const image3Data = selectedItem.piece_jointe_3;

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.modalContainer, { backgroundColor: getStatusColor(selectedItem.statut.type) }]}>
          <Text style={styles.title}>Détails de la demande</Text>
          <Text style={styles.text}>Demande numéro: {selectedItem.num_demande}</Text>
          <Text style={styles.text}>Longitude: {selectedItem.x}</Text>
          <Text style={styles.text}>Latitude: {selectedItem.y}</Text>
          <Text style={styles.text}>Date: {new Date(selectedItem.date).toLocaleString()}</Text>
          <Text style={[styles.text, { color: getStatusTextColor(selectedItem.statut.type) }]}>
            Statut de la demande: {selectedItem.statut.type}
          </Text>

          {image1Data && <Pdf source={{ uri: `data:application/pdf;base64,${image1Data}` }} style={styles.image} resizeMode="cover" />}
          {image2Data && <Pdf source={{ uri: `data:application/pdf;base64,${image2Data}` }} style={styles.image} resizeMode="cover" />}
          {image3Data && <Pdf source={{ uri: `data:application/pdf;base64,${image3Data}` }} style={styles.image} resizeMode="cover" />}

          <Button title="Fermer" onPress={closeModal} />
        </View>
      </ScrollView>
    );
  };

  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'Accépté':
        return '#ADD8E6'; // Light blue
      case 'Avis favorable':
        return '#98FB98'; // Light green
      default:
        return 'white'; // Default color
    }
  };

  const getStatusTextColor = (statusType) => {
    switch (statusType) {
      case 'Acceptée':
        return '#008000'; // Dark green
      case 'Favorable':
        return '#90EE90'; // Light green
      case 'Défavorable':
        return '#FFA07A'; // Light salmon
      case 'Rejetée':
        return '#FF0000'; // Red
      case 'En instance':
        return '#000080'; // Navy blue
      default:
        return '#333'; // Default text color
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
  data={data}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Demande numéro: {item.num_demande}</Text>
        <Text style={styles.text}>Longitude: {item.x}</Text>
        <Text style={styles.text}>Latitude: {item.y}</Text>
        <Text style={styles.text}>Date: {new Date(item.date).toLocaleString()}</Text>
        <Text style={[styles.text, { color: getStatusTextColor(item.statut.type) }]}>
          Statut de la demande: {item.statut.type}
        </Text>
      </View>
    </TouchableOpacity>
  )}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
/>


      {/* Modal to display additional information */}
      <Modal visible={modalVisible} transparent animationType="slide">
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4', // Light background color
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light border color
    backgroundColor: 'white', // White background color
    borderRadius: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Dark text color
  },
  text: {
    fontSize: 16,
    color: '#555', // Medium text color
  },
  separator: {
    height: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200, 
    borderRadius: 10,
    marginVertical: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default MyRequests;
