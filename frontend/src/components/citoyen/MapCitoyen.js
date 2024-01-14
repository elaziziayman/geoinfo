import { getDemandesMapbyUser } from '../../API';
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';  // Add this line

import 'leaflet.markercluster';

import markerDeclined from '../icons/decline.png';
import markerEnCours from '../icons/encours.png';
import markerFavorable from '../icons/favorable.png';
import markerDefavorable from '../icons/defavorable.png';


import { useNavigate } from 'react-router-dom';




const { BaseLayer } = LayersControl;

const getMarkerIcon = (type) => {
  switch (type) {
    case 'Acceptée':
      return markerEnCours;
    case 'Favorable':
      return markerFavorable;
    case 'Défavorable':
      return markerDefavorable;
    case 'Rejetée':
      return markerDeclined;
    default:
      return null;
  }
};


const MapCitoyen = () => {
  const position = [33.48, -7.61];
  const [communes, setCommunes] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(['Acceptée', 'Favorable', 'Défavorable', 'Rejetée']);
  const mapRef_citoyen = useRef(null);
  const navigate = useNavigate();


  const showPdf = (base64String) => {
    const pdfWindow = window.open('');
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64String}'></iframe>`
    );
  };

  const createPdfButton = (base64String, label, color) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.marginTop = '8px';
    button.style.padding = '4px 8px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = color; // Set the background color here
  
    button.disabled = base64String === null;
  
    if (base64String !== null) {
      button.addEventListener('click', () => {
        showPdf(base64String);
      });
    }
  
    return button;
  };
  

  const { state: { user } } = useLocation();

  const userId = user.id;

  console.log("user id :" + userId);

    
  useEffect(() => {
    getDemandesMapbyUser(userId).then((res) => {
      console.log("API Response:", res);
      setDataSource(res);
      console.log("Data source Citoyen : " + JSON.stringify(res).length)

    });

    fetchCommunesData();
  }, []);

  useEffect(() => {
    if (mapRef_citoyen.current) {
      const markers = L.markerClusterGroup();

      dataSource.forEach((demande) => {
        if (selectedLayer.includes(demande.statut.type)) {
          const marker = L.marker([demande.y, demande.x], {
            icon: L.icon({
              iconUrl: getMarkerIcon(demande.statut.type),
              iconSize: [25, 25],
              iconAnchor: [20, 30],
            }),
          });

          const popupContent = document.createElement('div');
          popupContent.innerHTML = `
            <p>Numéro de demande: ${demande.num_demande}</p>
            <p>Demandeur: ${demande.demandeur.nom} ${demande.demandeur.prenom}</p>
            <p>Autorisation: ${demande.autorisation.type}</p>
            <p>Occupation de terrain: ${demande.occupation.type}</p>
            <p>Statut: ${demande.statut.type}</p>
          `;
          

          popupContent.appendChild(createPdfButton(demande.piece_jointe_1, 'CIN', 'blue'));
          popupContent.appendChild(createPdfButton(demande.piece_jointe_2, 'Demande', 'orange'));
          popupContent.appendChild(createPdfButton(demande.piece_jointe_3, 'Titre foncier', 'green'));
          
          marker.bindPopup(popupContent);

          markers.addLayer(marker);
        }
      });

      mapRef_citoyen.current.addLayer(markers);
    }
  }, [selectedLayer, dataSource]);

  const fetchCommunesData = () => {
    fetch('http://localhost:8085/communes')
      .then((response) => response.json())
      .then((data) => {
        setCommunes(data);
      })
      .catch((error) => {
        console.error('Error fetching communes data:', error);
      });
  };

  




  return (
    <MapContainer center={position} zoom={10} style={{ height: '700px', width: '100%', zIndex: 0 }} ref={mapRef_citoyen}>
      {/* <LayersControl position="topright">
        {['Acceptée', 'Favorable', 'Défavorable', 'Rejetée'].map((type) => (
          <LayersControl.Overlay
            key={type}
            name={`Demande - ${type}`}
            checked={selectedLayer.includes(type)}
            onChange={() => setSelectedLayer((prev) => [...prev])}
          />
        ))}
      </LayersControl> */}

<LayersControl position="topright">
        <BaseLayer  name="Esri World Street Map">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            attribution=""
          />
        </BaseLayer>
        <BaseLayer name="Esri World Topo Map">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            attribution=""
          />
        </BaseLayer>
        <BaseLayer checked name="Esri World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution=""
          />
        </BaseLayer>
      </LayersControl>

      {communes &&
        communes.map((commune) => (
          <GeoJSON
            key={commune.nom}
            data={{
              type: 'Feature',
              properties: {
                nom: commune.nom,
                surface: commune.surface,
              },
              geometry: {
                type: 'MultiPolygon',
                coordinates: commune.geom.coordinates,
              },
            }}
            style={{
              fillColor: 'blue',
              weight: 2,
              opacity: 0.5,
              color: 'white',
              fillOpacity: 0.3,
            }}
          >
            <Popup>
              <div>
                <p>Arrondissement: {commune.nom}</p>
              </div>
            </Popup>
          </GeoJSON>
        ))}

      
    </MapContainer>
  );
};

export default MapCitoyen;
