import * as React from 'react';
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
import { mainListItems} from '../dashboard/listItems';
import Map from '../admin/MapAdmin';
import { Link as RouterLink } from 'react-router-dom'; 
import Legend from '../dashboard/Legend';
import MapCitoyen from './MapCitoyen';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';



import AssignmentIcon from '@mui/icons-material/Assignment';

import { useLocation } from 'react-router-dom';  // Add this line






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

export default function LocalisationDemandes() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const { state } = useLocation();




  const handleNavigation = (pathname) => {
    // Your logic here, you can perform additional actions before navigating
    // For example, you can fetch data, validate something, etc.

    // Then navigate to the specified path
    navigate(pathname, { state: { user: user } });
  };

  const user = state ? state.user : null;

  let username = user.nom +" " + user.prenom;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  if (user  === null) {
    // Render "Page Not Authorized" content
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: 'red' }}>
  <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Page Not Authorized</h1>
  <p style={{ fontSize: '1.5rem' }}>
    You don't have the necessary permissions to access this page.
  </p>
  {/* You can include additional content or redirect to another page */}
</div>

    );
  }



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
              Localisation de mes demandes
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {/* AccountCircleIcon and Typography wrapped in a div or Box */}
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
      <AccountCircleIcon sx={{ fontSize: 40 }} />
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ fontSize: '20px', marginLeft: '8px' }}
      >
        {`${username}`}
      </Typography>
    </Box>
    
    {/* IconButton for Logout */}
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
          <List component="nav">
          {/* <ListItemButton onClick={() => handleNavigation('/citoyen')}>
        <ListItemIcon>
          <HomeIcon sx={{ fontSize: 23, color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Accueil" />
      </ListItemButton> */}

      <ListItemButton onClick={() => handleNavigation('/citoyen/mes-demandes')}>
        <ListItemIcon>
          <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Mes demandes" />
      </ListItemButton>

      <ListItemButton onClick={() => handleNavigation('/citoyen/localiser-mes-demandes')}>
        <ListItemIcon>
          <MapIcon sx={{ fontSize: 23, color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Localiser mes demandes" />
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

              {/* Mes demandes */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <MapCitoyen />
                  <Legend />

                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
