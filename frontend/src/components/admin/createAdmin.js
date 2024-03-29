import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'; 

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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAdmins } from '../../API';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AttClients from './AttClients';
import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import CircularProgress from '@mui/material/CircularProgress';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import ListItemButton from '@mui/material/ListItemButton';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import DifferenceIcon from '@mui/icons-material/Difference';

import MapIcon from '@mui/icons-material/Map';

import AssignmentIcon from '@mui/icons-material/Assignment';


import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

function createData(id, num, demandeur, cin, email, statut, motif) {
  return { id, num, demandeur, cin, email, statut, motif };
}

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

const handleButtonClick = () => {
  console.log('Button Clicked!');
};

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

const defaultTheme = createTheme();

export default function CreateAdmin() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);


  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    password: '',
  });
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');


  const navigate = useNavigate();

  const { state } = useLocation();
  const handleNavigation = (pathname) => {

    navigate(pathname, { state: { user: user } });
  };

  const user = state ? state.user : null;

  let username = user.nom +" " + user.prenom;

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  useEffect(() => {
    setLoading(true);
    getAdmins().then((res) => {
      const formattedRows = res.map((data) => {
        console.log(data);
        username = data.nom + ' ' + data.prenom;
        return createData(
          data.id,
          data.id,
          username,
          data.cin,
          data.email,
          data.statut.type,
          data.motif
        );
      });

      setRows(formattedRows);
      setLoading(false);
    });
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== confirmationPassword) {
      setPasswordError('Le mot de passe et sa confirmation ne correspondent pas');

      return;
    }


    setPasswordError('');

    console.log('Form submitted with data:', formData);

    if(formData !=null){
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8085/admins', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
            if (response.ok) {
              console.log('Admin créé avec succès.');
        
        
        
            } else {
              console.error('Erreur lors de la création de l\'admin.');
            }
          } catch (error) {
            console.error('Erreur lors de la communication avec le serveur.', error);
          }finally {
            setLoading(false);
            setOpenDialog(true);
          }
    }

    setFormData({
      nom: '',
      prenom: '',
      email: '',
      cin: '',
      password: '',
    });

    setConfirmationPassword('');
  };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', 
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
              Création compte Admin
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
      <AccountCircleIcon sx={{ fontSize: 40 }} />
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ fontSize: '20px', marginLeft: '8px' }}
      >
        {`Admin : ${username}`}
      </Typography>
    </Box>
    
    <IconButton component={RouterLink} to="/" title="Se déconnecter" color="inherit">
      <LogoutIcon sx={{ fontSize: 30 }} />
    </IconButton>
  </Box>
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
          <ListItemButton onClick={() => handleNavigation('/admin/demandes-en-instance')}>
      <ListItemIcon>
        < DifferenceIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Les dossiers en instance" />
    </ListItemButton>

    <ListItemButton onClick={() => handleNavigation('/admin/demandes-en-cours')}>
      <ListItemIcon>
        <PendingActionsIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Les demandes en cours" />
    </ListItemButton>


    <ListItemButton onClick={() => handleNavigation('/admin/demandes')}>
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Toutes les demandes" />
    </ListItemButton>

    <ListItemButton onClick={() => handleNavigation('/admin/localiser-les-demandes')}>
      <ListItemIcon>
        <MapIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Localiser les demandes" />
    </ListItemButton>

    <ListItemButton onClick={() => handleNavigation('/admin/citoyens')}>
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Comptes Citoyens" />
    </ListItemButton>

    <ListItemButton onClick={() => handleNavigation('/admin/admins')}>
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Comptes Admin" />
    </ListItemButton>
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', fontSize: '3rem' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Remplissez ces informations (Un message de confirmation sera envoyé à l'adresse Email )
                  </Typography>
                  <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleFormChange}
                          fullWidth
                          required

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Prénom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleFormChange}
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="CIN"
                          name="cin"
                          value={formData.cin}
                          onChange={handleFormChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
  <TextField
    label="Mot de passe"
    name="password"
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    onChange={handleFormChange}
    fullWidth
    required
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Grid>

<Grid item xs={12}>
  <TextField
    label="Confirmer le mot de passe"
    name="confirmationPassword"
    type={showConfirmationPassword ? 'text' : 'password'}
    value={confirmationPassword}
    onChange={(event) => setConfirmationPassword(event.target.value)}
    fullWidth
    required
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
            edge="end"
          >
            {showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Grid>


        <Grid item xs={12}>


        {passwordError && (
  <Typography color="error" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
    {passwordError}
  </Typography>
)}
</Grid>
                      
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{ fontSize: '1.2rem' }}>
                        {loading ? 'Création en cours...' : 'Créer le compte'}
                        </Button>
                      </Grid>

                      {loading && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Compte crée avec succès !</DialogTitle>
        <DialogContent>
        <Typography>
        Compte crée avec succès !
</Typography>

        </DialogContent>
      </Dialog>
       </>
    

    
  );
}