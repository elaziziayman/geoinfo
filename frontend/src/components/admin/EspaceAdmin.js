import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { adminListItems} from '../dashboard/listItems';
import { Link as RouterLink } from 'react-router-dom'; 


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ fontSize: '1.2rem' }}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        E-Demandes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function EspaceAdmin() {











let username = "El Azizi Ayman";




// useEffect(() => {

//   setLoading(true);
//   getDemandes().then((res) => {
//     const formattedRows = res.map((data) => {
//         username = data.demandeur.nom + " " + data.demandeur.prenom;
//       return createData(
//         data.num_demande,
//         data.num_demande,
//         username,
//         data.demandeur.cin,
//         data.autorisation.type,
//         data.occupation.type,
//         data.commune.nom,
//         formatDate(data.date),
//         data.statut.type
//       );
//     });

//     setRows(formattedRows.slice(0, 5));

//     setLoading(false);
//   });


 
  





// }, []);




 
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontSize: '2rem' }} 
            >
              Espace Admin : {username}
            </Typography>
            <IconButton title="Notifications" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon sx={{ fontSize: 30}} />
              </Badge>

            </IconButton>
            <IconButton  component={RouterLink} to="/" title="Se déconnecter" color="inherit" sx={{ marginLeft: '8px' }}>
            <LogoutIcon sx={{ fontSize: 30 }}  />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List  component="nav" >
            {adminListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography
  variant="h3"
  component="div"
  gutterBottom
  sx={{
    fontFamily: 'Arial, sans-serif',
    fontSize: '3rem',
    textAlign: 'center',
    paddingTop: '50px', // Ajustez la valeur en fonction de vos préférences
    paddingBottom: '50px', // Ajustez la valeur en fonction de vos préférences
    backgroundColor: '#ffffff', // Fond blanc
    border: '2px solid #2196F3', // Bordure bleue
    borderRadius: '10px', // Bordure arrondie
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Ombre légère
  }}
>
  Bienvenue, {username} ! Découvrez vos fonctionnalités d'administration :
</Typography>

            {/* Section des fonctionnalités */}
            <Grid container spacing={3}>
              {/* Accepter ou Refuser les Dossiers */}
              <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%',  alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom style={{ fontSize: '1.8rem', textAlign: 'center' }}>
                    Accepter ou Refuser les Dossiers
                  </Typography>
                  <Grid container justifyContent="center" spacing={2} sx={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto' }}>
                    <img
                      src="img/accepter.png"
                      alt="Dossier Accepté"
                      style={{ maxWidth: '50%', maxHeight: '100%', margin: '8px' }}
                    />
                    <img
                      src="img/rejeter.png"
                      alt="Dossier Rejeté"
                      style={{ maxWidth: '50%', maxHeight: '100%', margin: '8px' }}
                    />
                  </Grid>
                  <Typography variant="body1" style={{ fontSize: '1.4rem', textAlign: 'center' }}>

                    Examiner et prendre des décisions sur les dossiers en instance.
                  </Typography>
                  {/* Ajoutez tout style ou icône supplémentaire selon les besoins */}
                </Paper>
              </Grid>

              {/* Avis Favorable ou Défavorable */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                  <Typography variant="h6" gutterBottom style={{ fontSize: '1.8rem', textAlign: 'center' }}>
                    Avis Favorable ou Défavorable
                  </Typography>
                  <Grid container justifyContent="center" spacing={2} sx={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto' }}>
                    <img
                      src="img/smile-icon.png"
                      alt="Avis Favorable"
                      style={{ maxWidth: '50%', maxHeight: '100%', margin: '8px' }}
                    />
                    <img
                      src="img/sad-icon.png"
                      alt="Avis Défavorable"
                      style={{ maxWidth: '50%', maxHeight: '100%', margin: '8px' }}
                    />
                  </Grid>
                  <Typography variant="body1" style={{ fontSize: '1.4rem', textAlign: 'center' }}>
                    Donnez votre avis sur les demandes.
                  </Typography>
                  {/* Ajoutez tout style ou icône supplémentaire selon les besoins */}
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom style={{ fontSize: '1.8rem' }}>
                    Localiser les Demandes sur la Carte
                  </Typography>
                  <img
                    src="img/localisation-sur-la-carte.png"
                    alt="Localiser Demandes sur la Carte"
                    style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '8px' }}
                  />
                  <Typography variant="body1" style={{ fontSize: '1.4rem', textAlign: 'center' }}>
                    Visualisez la distribution géographique des demandes.
                  </Typography>
                  {/* Ajoutez tout style ou icône supplémentaire selon les besoins */}
                </Paper>
              </Grid>

              {/* Activer ou Désactiver les Comptes des Citoyens */}
              <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom style={{ fontSize: '1.8rem' }}>
                    Activer ou Désactiver les Comptes des Citoyens
                  </Typography>

                  <img
                    src="img/toggle.jpg"
                    alt="Activer ou désactiver les comptes citoyens"
                    style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '8px' }}
                  />
                    <Typography variant="body1" style={{ fontSize: '1.4rem', textAlign: 'center' }}>
                    Gérez les comptes citoyens.
                  </Typography>
                  {/* Ajoutez tout style ou icône supplémentaire selon les besoins */}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
