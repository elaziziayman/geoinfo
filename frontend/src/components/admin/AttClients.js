import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TitleChart from '../dashboard/TitleChart';
import { styled, alpha } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';  // Add this import
import DialogTitle from '@mui/material/DialogTitle';  // Add this import
import DialogContent from '@mui/material/DialogContent';  // Add this import
import TextField from '@mui/material/TextField';  // Add this import
import DialogActions from '@mui/material/DialogActions';
import {Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


import axios from 'axios';





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    fontFamily: 'Lato, sans-serif',

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.primary.light, 0.1), // Adjust the alpha value as needed
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function AttClients({title, rows, paginationEnabled, showStatus, showMotif, loading, showAction}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [nomCompletFilter, setNomCompletFilter] = useState('');
const [cinFilter, setCinFilter] = useState('');
const [emailFilter, setEmailFilter] = useState('');
const [statutFilter, setStatutFilter] = useState('');


const getUniqueValues = (rows, columnName) => {
  return Array.from(new Set(rows.map((row) => row[columnName])));
};
let statutMatch;

const filteredRows = rows.filter((row) => {
  const nomCompletMatch = row.demandeur.toLowerCase().includes(nomCompletFilter.toLowerCase());
  const cinMatch = row.cin.toLowerCase().includes(cinFilter.toLowerCase());
  const emailMatch = row.email.toLowerCase().includes(emailFilter.toLowerCase());

  if (statutFilter !== '') {
    statutMatch = row.statut.toLowerCase() === statutFilter.toLowerCase();
  } else {
    statutMatch = true;
  }

  return nomCompletMatch && cinMatch && emailMatch && statutMatch;
});



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };
  const [openReasonDialogDisable, setOpenReasonDialogDisable] = useState(false);




  const [selectedRowId, setSelectedRowId] = useState(null);

  const [disableReason, setDisableReason] = useState('');
  const [rowData, setRowData] = useState(rows);


  useEffect(() => {
    // Update rows data when the prop 'rows' changes
    setRowData(rows);
  }, [rows]);


  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);
  const CenteredLoading = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });

  const buttonStyle = {
    width: '70px',
    height: '60px', // Set height equal to width to make the button circular
    margin: '0 8px',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'YourFont, sans-serif',
    borderRadius: '50%', // Make the button circular
  };

  const handleOpenReasonDialogDisable = (id) => {
    setSelectedRowId(id);
    setOpenReasonDialogDisable(true);
  };

  const handleCloseReasonDialogDisable = () => {
    setSelectedRowId(null);
    setOpenReasonDialogDisable(false);
  };

  const handleDisable = () => {
    // Placeholder function for handling rejection

 console.log(`Disable reason for row with ID ${selectedRowId}: ${disableReason}`);
 handleCloseReasonDialogDisable();

 axios.post('http://localhost:8085/utilisateurs/updateStatut', {
   id_user: selectedRowId,
   id_statut:7,
   motif: disableReason,
 })
 .then(response => {
   console.log('Update successful:', response.data);
   setRowData((prevRows) =>
          prevRows.map((row) =>
            row.id === selectedRowId ? { ...row, statut: 7, motif: disableReason } : row
          )
        );
 })
 .catch(error => {
   // Gérer les erreurs
   console.error('Update error:', error);
 });


 }

 const handleEnable = (id) => {
  // Placeholder function for handling rejection
  setSelectedRowId(id);

console.log('rowid : ' + id)
axios.post('http://localhost:8085/utilisateurs/updateStatut', {
 id_user: id,
 id_statut:8,
 motif: '',
})
.then(response => {
 console.log('Update successful:', response.data);
 setRowData((prevRows) =>
 prevRows.map((row) => (row.id === id ? { ...row, statut: 8 } : row))
);
})
.catch(error => {
 // Gérer les erreurs
 console.error('Update error:', error);
});


}

  return (
    <React.Fragment>
      <TitleChart>{title}</TitleChart>
      <TableHead>
        <TableRow>
        <TableCell>
       
        <FormControl fullWidth style={{ marginLeft: '20px', width: '225px' }}>
  <InputLabel id="nom-complet-filter-label" style={{
      visibility: nomCompletFilter ? 'hidden' : 'visible',
      // Add other styling as needed
    }} >Filtrer par Nom complet</InputLabel>
  <Autocomplete
    id="nom-complet-filter"
    options={getUniqueValues(rows, 'demandeur')}
    value={nomCompletFilter || ''}
    onChange={(event, newValue) => {
      const selectedValue = newValue || '';
      setNomCompletFilter(selectedValue);
    }}
    renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
  />
</FormControl>

<FormControl fullWidth style={{ marginLeft: '20px', width: '225px' }}>
  <InputLabel id="cin-filter-label" style={{
      visibility: cinFilter ? 'hidden' : 'visible',
      // Add other styling as needed
    }}>Filtrer par CIN</InputLabel>
  <Autocomplete
    id="cin-filter"
    options={getUniqueValues(rows, 'cin')}
    value={cinFilter || ''}
    onChange={(event, newValue) => {
      const selectedValue = newValue || '';
      setCinFilter(selectedValue);
    }}
    renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
  />
</FormControl>

<FormControl fullWidth style={{ marginLeft: '20px', width: '225px' }}>
  <InputLabel id="email-filter-label" style={{
      visibility: emailFilter ? 'hidden' : 'visible',
      // Add other styling as needed
    }}>Filtrer par Email</InputLabel>
  <Autocomplete
    id="email-filter"
    options={getUniqueValues(rows, 'email')}
    value={emailFilter || ''}
    onChange={(event, newValue) => {
      const selectedValue = newValue || '';
      setEmailFilter(selectedValue);
    }}
    renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
  />
</FormControl>

<FormControl fullWidth style={{ marginLeft: '20px', width: '225px' }}>
  <InputLabel id="statut-filter-label" style={{
      visibility: statutFilter ? 'hidden' : 'visible',
      // Add other styling as needed
    }}>Filtrer par Statut</InputLabel>
  <Autocomplete
    id="statut-filter"
    options={getUniqueValues(rows, 'statut')}
    value={statutFilter || ''}
    onChange={(event, newValue) => {
      const selectedValue = newValue || '';
      setStatutFilter(selectedValue);
    }}
    renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
  />
</FormControl>
             </TableCell>

       

          </TableRow>
      </TableHead>

      {loading ? (
         <CenteredLoading>
         <CircularProgress />
       </CenteredLoading>) : (
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 20 }}>Id citoyen</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Nom complet</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>CIN</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Email</StyledTableCell>
            <StyledTableCell align="right" sx={{ fontSize: 20 }}>Statut</StyledTableCell>
            <StyledTableCell align="right" sx={{ fontSize: 20 }}>Motif</StyledTableCell>

            {showAction &&(<StyledTableCell sx={{ fontSize: 20 }}>Action</StyledTableCell>)}


          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.num}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.demandeur}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.cin}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.email}</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.statut}</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.motif}</StyledTableCell>
              {showAction && (
  <Button
    variant="contained"
    color={row.statut === 'Désactivé' ? 'success' : 'error'}
    onClick={() => {
      if (row.statut === 'Désactivé') {
        handleEnable(row.id);
      } else {
        handleOpenReasonDialogDisable(row.id)
      }
    }}
    sx={{ ...buttonStyle }}
  >
    {row.statut === 'Désactivé' ? 'Activer' : 'Désactiver'}
  </Button>
)}




            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      )}
      {paginationEnabled && (
        <TablePagination
          rowsPerPageOptions={[7]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

<Dialog open={openReasonDialogDisable} onClose={handleCloseReasonDialogDisable} fullWidth maxWidth="md">
  <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}>
    Saisir le motif de désactivation de ce compte
  </DialogTitle>
  <DialogContent>
    <TextField
      multiline
      rows={4}
      fullWidth
      label="Motif"
      variant="outlined"
      value={disableReason}
      onChange={(e) => setDisableReason(e.target.value)}
      sx={{ fontSize: '18px', fontFamily: 'YourFont, sans-serif' }}
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleCloseReasonDialogDisable}
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Annuler
    </Button>
    <Button
      onClick={handleDisable}
      variant="contained"
      color="secondary"
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Désactiver
    </Button>
  </DialogActions> 
</Dialog>
    </React.Fragment>
  );
}