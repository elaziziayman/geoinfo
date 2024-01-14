import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

const Map = ({ user  }) => {
  const [markers, setMarkers] = useState([]);
  console.log("id user: "+ user.id)

  useEffect(() => {
    fetch(`http://192.168.100.8:8085/demandes_par_utilisateur/${user.id}`)
      .then(response => response.json())
      .then(data => {
        const simplifiedData = data.map(({ x, y }) => ({ x, y }));
        console.log(simplifiedData);
        setMarkers(simplifiedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderMarkers = () => {
  return markers.map((marker, index) => (
    `<script>
      var customPopup = "<b>Marker ${index + 1}</b>";

      L.marker([${marker.y}, ${marker.x}])
        .addTo(map)
        .bindPopup(customPopup)
        .openPopup();
    </script>`
  )).join('');
};

  return (
    <WebView
      source={{
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
              />
              <style>
                #map {
                  height: 100vh;
                }
              </style>
            </head>
            <body>
              <div id="map"></div>
              <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
              <script>
                var map = L.map('map').setView([33.5731104, -7.5898434], 13);
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
                  maxZoom: 19,
                }).addTo(map);
              </script>
              ${renderMarkers()}
            </body>
          </html>
        `,
      }}
    />
  );
};

export default Map;
