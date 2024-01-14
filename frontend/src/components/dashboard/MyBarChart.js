import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import TitleChart from './TitleChart';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';

import * as FileSaver from 'file-saver';

import XLSX from 'sheetjs-style';



import { getCountDemandesByCommune } from '../../API';
import MyBarChart_2 from './MyBarChart_2';

let labelsBarChart, valuesBarChart, exportData;

function createExportData(Nom_Arrondissment, Nombre_de_demandes) {
  return {Nom_Arrondissment, Nombre_de_demandes};
}

function createBarChartLabels(nom_commune) {
  return nom_commune;
}

function createBarChartValues(num_demandes) {
  return num_demandes;
}

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

 


export default function MyBarChart({ title }) {
  const [uData, setuData] = useState([]);
  const [xLabels, setxLabels] = useState([]);

  useEffect(() => {
    getCountDemandesByCommune().then((res) => {
      labelsBarChart = res.map((item) => createBarChartLabels(item.nom_commune));
      valuesBarChart = res.map((item) => createBarChartValues(item.num_demandes));
      exportData = res.map((item) => createExportData(item.nom_commune,item.num_demandes));

      setxLabels(labelsBarChart);
      setuData(valuesBarChart);

      console.log("Labels to show: " + labelsBarChart);
      console.log("Values to show: " + valuesBarChart);
    });
  }, []);

  // const handleExportToExcel = () => {
  //   const data = xLabels.map((label, index) => ({
  //     'Nom Commune': label,
  //     'Nombre de demandes': uData[index],
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Demandes par Commune');
  //   XLSX.writeFile(wb, 'demandes-par-commune.xlsx');
  // };
  console.log(exportData);

  const exporttoExcel = async() =>{
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = {Sheets : {'data' : ws}, SheetNames:['data']};
    const excelBuffer = XLSX.write(wb,{bookType:'xlsx', type:'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, "Statistiques_demande" + fileExtension)
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TitleChart style={{ marginBottom: '20px' }}>{title} <IconButton  title="Exporter les données en format Excel" color="inherit" onClick={exporttoExcel} >
        <DownloadIcon sx={{ fontSize: 30 }} />
      </IconButton> </TitleChart>
      <div style={{ flex: 1, height:'100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
        
            <MyBarChart_2 />
       
      </div>
    </div>
  );
}
