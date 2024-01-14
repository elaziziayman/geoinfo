import React from "react";
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';


export const Navigation = (props) => {
  
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            E-Demandes
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            
            
            <li>
              <a href="http://localhost:3000/#features" className="page-scroll">
                Types de Demandes
              </a>
            </li>
            <li>
              <a href="http://localhost:3000/#portfolio" className="page-scroll">
                Procédures Administratives
              </a>
            </li>
            <li>
              <a href="/tableau-de-bord" className="page-scroll">
                Tableau de bord
              </a>
            </li>

            <li>
            <Button
                component={Link}
                to="/Login"
                variant="outlined"
                style={{
                  background: 'black',
                  color: 'white',
                  border: '1px solid grey',
                  borderRadius: '20px',  // Ajustez la valeur selon vos besoins
                  padding: '10px 20px', // Ajustez la valeur selon vos besoins
                }}
                className="page-scroll"
              >
                Se connecter
              </Button>
            </li>

  
            <li>
              <a href="http://localhost:3000/#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
