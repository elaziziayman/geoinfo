import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import eDoc from '../icons/eDoc.png';
import { Navigation } from '../navigation';
import zxcvbn from 'zxcvbn';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';


const defaultTheme = createTheme();

export default function SignInSide() {
  const [showPassword, setShowPassword] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);



    let dataUser;



    
   

  const [formErrors, setFormErrors] = useState({
    lastName: false,
    firstName: false,
    email: false,
    CIN: false,
    password: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  const formatData = () => {
    return {
      nom: document.getElementById('lastName').value,
      prenom: document.getElementById('firstName').value,
      email: document.getElementById('email').value,
      cin: document.getElementById('CIN').value,
      password: document.getElementById('password').value,

      role: { id: 2 },
    };
  };
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const passwordStrength = zxcvbn(password);

    const isWeakPassword = passwordStrength.score < 3;

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      password: isWeakPassword,
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    const password = event.currentTarget.form.password.value;

    const passwordsMatch = password === confirmPassword;

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: !passwordsMatch,
      passwordMismatch: !passwordsMatch,
    }));
  };
   const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const errors = {
      lastName: !data.get('lastName'),
      firstName: !data.get('firstName'),
      email: !data.get('email'),
      CIN: !data.get('CIN'),
      password: !data.get('password'),
      confirmPassword: !data.get('confirmPassword'),
      passwordMismatch: formErrors.passwordMismatch,
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    console.log("Nom :" + document.getElementById('lastName').value);

    dataUser = formatData();

    console.log("Data to post:", dataUser);

if(dataUser!=null){
  setLoading(true);
   try {
    const response = await fetch('http://localhost:8085/utilisateurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    });

    if (response.ok) {
      console.log('Utilisateur créé avec succès.');



    } else {
      console.error('Erreur lors de la création de l\'utilisateur.');
    }
  } catch (error) {
    console.error('Erreur lors de la communication avec le serveur.', error);
  }finally {
    setLoading(false);
    setOpenDialog(true);
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
                Créer un compte
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Nom"
                      name="lastName"
                      autoComplete="family-name"
                      sx={{
                        fontSize: '1.2rem',
                        border: formErrors.lastName ? '1px solid red' : '1px solid black',
                        borderRadius: '8px',
                      }}
                    />
                    {formErrors.lastName && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        Le nom est obligatoire.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Prénom"
                      autoFocus
                      sx={{
                        fontSize: '1.2rem',
                        border: formErrors.firstName ? '1px solid red' : '1px solid black',
                        borderRadius: '8px',
                      }}
                    />
                    {formErrors.firstName && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        Le prénom est obligatoire.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Adresse Email"
                      name="email"
                      autoComplete="email"
                      sx={{
                        fontSize: '1.2rem',
                        border: formErrors.email ? '1px solid red' : '1px solid black',
                        borderRadius: '8px',
                      }}
                    />
                    {formErrors.email && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        L'adresse email est obligatoire.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      id="CIN"
                      label="CIN"
                      name="CIN"
                      autoComplete="CIN"
                      sx={{
                        border: formErrors.CIN ? '1px solid red' : '1px solid black',
                        borderRadius: '8px',
                      }}
                    />
                    {formErrors.CIN && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        Le numéro CIN est obligatoire.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type={showPassword ? 'text' : 'password'}

                      id="password"
                      autoComplete="new-password"
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                       
                      }}
                      sx={{
                        fontSize: '1.2rem',
                        border: formErrors.password ? '1px solid red' : '1px solid black',
                        borderRadius: '8px',
                      }}
                    />
                    {formErrors.password && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        Le mot de passe est faible. Choisissez un mot de passe plus fort.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirmez le mot de passe"
                      type={showPassword ? 'text' : 'password'}

                      id="confirmPassword"
                      autoComplete="new-password"
                      onChange={handleConfirmPasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        fontSize: '1.2rem',
                        border: formErrors.confirmPassword ? '1px solid red' : '1px solid black',
                        borderRadius: '8px',
                      }}
                    />
                    {formErrors.confirmPassword && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        Veuillez confirmer le mot de passe.
                      </Typography>
                    )}
                    {formErrors.passwordMismatch && (
                      <Typography variant="caption" color="red" gutterBottom sx={{ fontSize: '10px' }}>
                        Les mots de passe ne correspondent pas.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
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
                  {loading ? 'Création en cours...' : 'Créer le compte'}
                </Button>
                {loading && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
     <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Compte crée avec succès !</DialogTitle>
        <DialogContent>
        <Typography>
  Vous allez recevoir un lien de confirmation de votre compte dans cet email : {document.getElementById('email') ? document.getElementById('email').value : 'Email non disponible'}
</Typography>

        </DialogContent>
      </Dialog>
    </>
  );
}
