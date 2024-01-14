import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";

import Dashboard from "./components/dashboard/Dashboard";
import MesDemandes from "./components/citoyen/MesDemandes";
import DemandesAdmin from "./components/admin/DemandesAdmin";

import NotFound from "./components/NotFound"; // Import the NotFound component



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import DemandesAcceptees from "./components/dashboard/DemandesAcceptees";
import DemandesRejetees from "./components/dashboard/DemandesRejetees";
import LocalisationDemandes from "./components/citoyen/LocalisationDemandes";
import LocalisationDemandesAdmin from "./components/admin/LocalisationDemandesAdmin";
import DemandesAvisAdmin from "./components/admin/DemandesAvisAdmin";
import Citoyens from "./components/admin/Citoyens";
import DemandesEnInstanceAdmin from "./components/admin/DemandesEnInstanceAdmin";
import Login from "./components/dashboard/Login";
import Register from "./components/dashboard/Register";
import EspaceAdmin from "./components/admin/EspaceAdmin";
import EspaceCitoyen from "./components/citoyen/EspaceCitoyen";

import ComptesAdmins from "./components/admin/ComptesAdmin";
import CreateAdmin from "./components/admin/createAdmin"


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
    <Router>
      <Routes>
      <Route path="/" element= {<LandingPage data = {landingPageData} />} />
        <Route path="/tableau-de-bord" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* <Route path="/citoyen" element={<EspaceCitoyen />} /> */}
        <Route path="/citoyen/mes-demandes" element={<MesDemandes />} />
        <Route path="/citoyen/localiser-mes-demandes" element={<LocalisationDemandes />} />


        {/* <Route path="/admin" element={<EspaceAdmin />} /> */}
        <Route path="/admin/localisation-des-demandes" element={<LocalisationDemandesAdmin />} />
        <Route path="/admin/demandes" element={<DemandesAdmin />} />
        <Route path="/admin/demandes-en-cours" element={<DemandesAvisAdmin />} />
        <Route path="/admin/demandes-en-instance" element={<DemandesEnInstanceAdmin />} />
        <Route path="/admin/localiser-les-demandes" element={<LocalisationDemandesAdmin />} />
        <Route path="/admin/citoyens" element={<Citoyens />} />


        <Route path="/admin/createAdmin" element={<CreateAdmin />} />
        <Route path="/admin/admins" element={<ComptesAdmins />} />




        <Route path="*" element={<NotFound />} />
        



        



      </Routes>
    </Router>
   
   /*{ <div>
       <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Features data={landingPageData.Features} />
      <Gallery data={landingPageData.Gallery} />
      <Contact data={landingPageData.Contact} /> 
      <Dashboard />
  </div>}*/
  );
};

export default App;
