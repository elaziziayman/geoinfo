import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from 'react-native-webview';

// MapModal component
const MapModal = ({ isVisible, onClose, onMarkerSelect }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <style>
          #map { height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([33.54, -7.61], 7);
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png').addTo(map);
          var marker;

          map.on('click', function(e) {
            if (marker) {
              map.removeLayer(marker);
            }
            marker = L.marker(e.latlng).addTo(map);
            window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: e.latlng.lat, longitude: e.latlng.lng }));
            console.log("coords"+marker.latlng.lat)
          });
        </script>
      </body>
    </html>
  `;

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={{ flex: 1 }}>
        <WebView
          source={{ html: htmlContent }}
          onMessage={(event) => {
            const selectedCoords = JSON.parse(event.nativeEvent.data);
            onMarkerSelect(selectedCoords);
          }}
        />
        <TouchableOpacity style={styles.mapButton} onPress={onClose}>
          <Text style={styles.mapButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// CircularButton component
const CircularButton = ({
  title,
  onPress,
  onUnloadFile,
  color,
  fileName,
  onMapButtonPress,
}) => (
  <View style={styles.circularButtonContainer}>
    <TouchableOpacity
      style={[styles.circularButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.circularButtonText}>{title}</Text>
    </TouchableOpacity>
    {fileName && (
      <TouchableOpacity onPress={onUnloadFile} style={styles.unloadIconContainer}>
        <Text style={styles.unloadIcon}>X</Text>
      </TouchableOpacity>
    )}
    {onMapButtonPress && (
      <TouchableOpacity onPress={onMapButtonPress} style={styles.mapButton}>
        <Text style={styles.mapButtonText}>Choisir l'emplacement</Text>
      </TouchableOpacity>
    )}
  </View>
);


const unloadFile = (setFile) => {
  setFile({ uri: null, color: "#9da3a1", name: null });
};


// Main App component
export default function App({ user }) {
  const resetForm = () => {
    setLocation({ latitude: "", longitude: "" });
    setTypeOcc(null);
    setTypeAut(null);
    setFile1({ uri: null, color: "#9da3a1", name: null });
    setFile2({ uri: null, color: "#9da3a1", name: null });
    setFile3({ uri: null, color: "#9da3a1", name: null });
    setIsFormValid(false);
  };

  console.log("user_id_form : "+ user.id)
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [typeOcc, setTypeOcc] = useState(null);
  const [typeAut, setTypeAut] = useState(null);
  const [file1, setFile1] = useState({
    uri: null,
    color: "#9da3a1",
    name: null,
  });
  const [file2, setFile2] = useState({
    uri: null,
    color: "#9da3a1",
    name: null,
  });
  const [file3, setFile3] = useState({
    uri: null,
    color: "#9da3a1",
    name: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

  const handleMapButtonPress = () => {
    setIsMapModalVisible(true);
  };

  const handleMarkerSelect = (selectedCoords) => {
    setLocation({
      ...location,
      longitude: selectedCoords.longitude.toString(),
      latitude: selectedCoords.latitude.toString(),
    });
    setIsMapModalVisible(false);
    validateForm();
  };

  const occupationOptions = {
    Villa: 1,
    Immeuble: 2,
    Ferme: 3,
    Terrain: 4,
  };

  const autorisationOptions = {
    Construction: 1,
    Extension: 2,
    Démolition: 3,
  };

  const [showTypeOccPicker, setShowTypeOccPicker] = useState(false);
  const [showTypeAutPicker, setShowTypeAutPicker] = useState(false);

  const handleTypeOccChange = (itemValue) => {
    if (itemValue !== null) {
      setTypeOcc(itemValue);
      setShowTypeOccPicker(false);
      validateForm();
    }
  };

  const handleTypeAutChange = (itemValue) => {
    setTypeAut(itemValue);
    setShowTypeAutPicker(false);
    validateForm();
  };

  const pickFile = async (setFile) => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "application/pdf"],
      });
  
      if (docRes && docRes.assets && docRes.assets[0]) {
        if (docRes.assets[0].size > 3 * 1024 * 1024) {
          alert("La taille de ce fichier dépasse 3MO. Choisissez SVP un fichier plus petit.");
          return;
        }
  
        const file = docRes.assets[0].uri;
        try {
          // Lire le contenu du fichier
          const response = await fetch(file);
          const blob = await response.blob();
          const base64data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          base64String = base64data.split(',')[1];
  
          
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier : ', error);
          
        }
        // Appeler la fonction pour convertir en base64
        //const base64format = convertToBase64(file);
        //console.log(base64String)
        const fileName = docRes.assets[0].name || "Untitled"; // default name if not present
        //console.log(docRes)
        setFile({ uri: base64String, color: "#1ab07e", name: fileName });
        validateForm();
      } else {
        console.log("Invalid document response format:", docRes);
      }
    } catch (error) {
      console.log("Error while selecting file:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        demandeur: { id: user.id },
        x: parseFloat(location.longitude),
        y: parseFloat(location.latitude),
        autorisation: { id: typeAut },
        occupation: { id: typeOcc },
       
        piece_jointe_1: file1.uri,
        piece_jointe_2: file2.uri,
        piece_jointe_3: file3.uri,
      };
      console.log(formData.piece_jointe_1)

      const response = await fetch("http://192.168.100.8:8085/demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Failed to submit data to the server");
        return;
      }
    } catch (error) {
      console.error("An error occurred while submitting data:", error.message);
    }
  };

  const validateForm = () => {
    const isLongitudeValid = location.longitude.trim() !== "";
    const isLatitudeValid = location.latitude.trim() !== "";
    const isTypeOccValid = typeOcc !== null;
    const isTypeAutValid = typeAut !== null;
    const isFile1Valid = file1.uri !== null;
    const isFile2Valid = file2.uri !== null;
    const isFile3Valid = file3.uri !== null;

    setIsFormValid(
      isLongitudeValid &&
      isLatitudeValid &&
      isTypeOccValid &&
      isTypeAutValid &&
      isFile1Valid &&
      isFile2Valid &&
      isFile3Valid
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {/* Map button */}
        <CircularButton
          title="Choisir l'emplacement"
          onMapButtonPress={handleMapButtonPress}
        />
        {/* MapModal */}
        <MapModal
          isVisible={isMapModalVisible}
          onClose={() => setIsMapModalVisible(false)}
          onMarkerSelect={handleMarkerSelect}
        />

        {/* Type occupation picker */}
        <Text>Type occupation:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={typeOcc}
            onValueChange={handleTypeOccChange}
            mode="dropdown"
            visible={showTypeOccPicker}
          >
            <Picker.Item
              label="Choisir un type d'occupations"
              value={null}
              disabled={true}
              style={{ color: "white" }}
            />
            {Object.keys(occupationOptions).map((label) => (
              <Picker.Item
                key={label}
                label={label}
                value={occupationOptions[label]}
              />
            ))}
          </Picker>
        </View>

        {/* Type autorisation picker */}
        <Text>Type autorisation:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={typeAut}
            onValueChange={handleTypeAutChange}
            mode="dropdown"
            visible={showTypeAutPicker}
          >
            <Picker.Item
              label="Choisir un type d'autorisation"
              value={null}
              disabled={true}
              style={{ color: "white" }}
            />
            {Object.keys(autorisationOptions).map((label) => (
              <Picker.Item
                key={label}
                label={label}
                value={autorisationOptions[label]}
              />
            ))}
          </Picker>
        </View>

        {/* File pickers */}
        <Text>Pièces jointes : </Text>
        <View style={styles.circularButtonContainer}>
          <View style={styles.buttonWithTextContainer}>
            <CircularButton
              title="CIN"
              onPress={() => pickFile(setFile1)}
              onUnloadFile={() => unloadFile(setFile1)}
              color={file1.color}
              fileName={file1.name}
            />
            <Text style={styles.fileNameText}>{file1.name}</Text>
          </View>
          <View style={styles.buttonWithTextContainer}>
            <CircularButton
              title="D"
              onPress={() => pickFile(setFile2)}
              onUnloadFile={() => unloadFile(setFile2)}
              color={file2.color}
              fileName={file2.name}
            />
            <Text style={styles.fileNameText}>{file2.name}</Text>
          </View>
          <View style={styles.buttonWithTextContainer}>
            <CircularButton
              title="TF"
              onPress={() => pickFile(setFile3)}
              onUnloadFile={() => unloadFile(setFile3)}
              color={file3.color}
              fileName={file3.name}
            />
            <Text style={styles.fileNameText}>{file3.name}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View>
        <Button
            title="Abandonner"
            titleStyle={styles.btn}  
            buttonStyle={{ backgroundColor: "#c25b5b" }} 
            onPress={resetForm}  
          />
        </View>
        <Button
          title="Ajouter"
          onPress={handleSubmit}
          color="#64de6e"
          disabled={!isFormValid}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  btn: {
    color: "green",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  circularButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  circularButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  circularButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  fileNameText: {
    color: "black",
    textAlign: "center",
  },
  unloadIconContainer: {
    marginLeft: 10,
    padding: 5,
  },
  unloadIcon: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  mapButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c25b5b",  
    marginTop: 10,
  },
  mapButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
