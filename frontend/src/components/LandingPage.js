import React from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { About } from "./about";
import { Services } from "./services";
import { Features } from "./features";
import { Gallery } from "./gallery";
import { Contact } from "./contact";
import Dashboard from "./dashboard/Dashboard";


export default function LandingPage({data}) {
  
    return (
      <div>
        <Navigation />
        <Header data={data.Header} />
        <Features data={data.Features} />

        <Gallery data={data.Gallery} />
        <Contact data={data.Contact} /> 
    </div>
        
    );
  }