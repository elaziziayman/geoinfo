import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCountDemandesByCommune } from '../../API';

let exportData;

function createExportData(Nom_Arrondissment, Nombre_de_demandes) {
  return {Nom_Arrondissment, Nombre_de_demandes};
}

function MyBarChart_2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCountDemandesByCommune().then((res) => {
      exportData = res.map((item) => createExportData(item.nom_commune,item.num_demandes));
      setData(exportData);
    });
  }, []);

  return (
    <BarChart
      width={1050}
      height={650}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 250,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
  dataKey="Nom_Arrondissment"
  angle={-90}
  textAnchor="end"
  tick={{
    fontSize: 12, 
    fontWeight: 'bold',
    fontStyle: 'italic',
  }}
/>

      <YAxis />
      <Tooltip />
      <Legend layout="horizontal" verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <Bar dataKey="Nombre_de_demandes" fill="#8884d8" />
    </BarChart>
  );
}

export default MyBarChart_2;
