import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import ListItemButton from '@mui/material/ListItemButton';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DifferenceIcon from '@mui/icons-material/Difference';


export const mainListItems = (
  <React.Fragment>
     <ListItemButton component={RouterLink} to="/citoyen">
      <ListItemIcon>
        <HomeIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Accueil" />
     </ListItemButton>

    <ListItemButton component={RouterLink} to="/citoyen/mes-demandes">
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Mes demandes" />
     </ListItemButton>
    <ListItemButton component={RouterLink} to="/citoyen/localiser-mes-demandes">
      <ListItemIcon>
        <MapIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Localiser mes demandes" />
    </ListItemButton>
  </React.Fragment>
);


export const adminListItems = (
  
  <React.Fragment>
     <ListItemButton component={RouterLink} to="/admin">
      <ListItemIcon>
        <HomeIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Accueil" />
     </ListItemButton>

    <ListItemButton component={RouterLink} to="/admin/demandes-en-instance">
      <ListItemIcon>
        < DifferenceIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Les dossiers en instance" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/admin/demandes-en-cours">
      <ListItemIcon>
        <PendingActionsIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Les demandes en cours" />
    </ListItemButton>


    <ListItemButton component={RouterLink} to="/admin/demandes">
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Toutes les demandes" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/admin/localiser-les-demandes">
      <ListItemIcon>
        <MapIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Localiser les demandes" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/admin/citoyens">
      <ListItemIcon>
        <AssignmentIcon sx={{ fontSize: 23, color: 'primary.main' }} />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Comptes Citoyens" />
    </ListItemButton>
  </React.Fragment>
);