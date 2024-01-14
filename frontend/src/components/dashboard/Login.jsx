import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import eDoc from '../icons/eDoc.png';
import { Navigation } from '../navigation';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom';





const defaultTheme = createTheme();

export default function SignInSide() {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  let dataJson;


  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const errors = {
      email: !data.get('email'),
      password: !data.get('password'),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    


    

     dataJson = {email : data.get('email'),
     password: data.get('password')};
     console.log("data Json :" +dataJson);


      if(dataJson !=null){
        setLoading(true);

        try {
          const response = await fetch('http://localhost:8085/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataJson),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData.role.id);
            if(responseData.role.id === 2){
              if(responseData.statut.id === 8){

              navigate('/citoyen/mes-demandes', { state: { user: responseData } });
              }


            }
            else if(responseData.role.id === 1){
              navigate('/admin/demandes-en-instance', { state: { user: responseData } });


            }




      
      
      
          } else {
            console.error('Error while login');
            // Effectuez les actions nécessaires en cas d'erreur
          }
        } catch (error) {
          console.error('Erreur lors de la communication avec le serveur.', error);
          // Effectuez les actions nécessaires en cas d'erreur de communication avec le serveur
        }finally {
          setLoading(false);
        }

        

      }

    
  };

  return (
    <>
      <Navigation />
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${eDoc})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 15,
              }}
            >
              <Avatar sx={{ m: 1, backgroundColor: 'transparent', border: '4px solid black', width: 80, height: 80 }}>
                <img src="img/favicon.ico" alt="Icon" width="100%" height="100%" />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                fontWeight="bold"
                sx={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Connectez-Vous
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 4,
                  mx: 'auto',
                  width: '80%',
                  maxWidth: 400,
                  textAlign: 'center',
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email / CIN"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{
                    fontSize: '1.2rem',
                    border: formErrors.email ? '1px solid red' : '1px solid black',
                    borderRadius: '8px',
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{
                    fontSize: '1.2rem',
                    border: formErrors.password ? '1px solid red' : '1px solid black',
                    borderRadius: '8px',
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#001f3f',
                    color: 'white',
                    fontSize: '1.2rem',
                    borderRadius: '15px',
                  }}
                >
               {loading ? 'Connection en cours...' : 'Se connecter'}

                </Button>

                {loading && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                {/* Add a loading spinner or message as needed */}
                <CircularProgress />
              </Box>
            )}

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  <Link sx={{ fontSize: '14px' }} href="/Register" variant="body2">
                    {"Vous n'avez pas de compte ? Inscrivez-vous maintenant"}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
