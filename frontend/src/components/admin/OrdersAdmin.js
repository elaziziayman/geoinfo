import * as React from 'react';
import { useState } from 'react';

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
import Dialog from '@mui/material/Dialog'; 
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'; 
import TextField from '@mui/material/TextField';  
import DialogActions from '@mui/material/DialogActions';
import {Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


import axios from 'axios';







const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px',
  minWidth: '100px',


  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontFamily: 'Lato, sans-serif',

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function OrdersAdmin({title, rows, paginationEnabled, showStatus, showMotif, loading, showActions, showAvis}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [openReasonDialogRejetee, setOpenReasonDialogRejetee] = useState(false);

  const [openReasonDialogDefavorable, setOpenReasonDialogDefavorable] = useState(false);



  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [demandeurFilter, setDemandeurFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [occupationFilter, setOccupationFilter] = useState('');
  const [autorisationFilter, setAutorisationFilter] = useState('');
  const [arrondissementFilter, setArrondissementFilter] = useState('');
  const [statutFilter, setStatutFilter] = useState('');

  const handleFilterChange = (event, filterFunction) => {
    filterFunction(event.target.value);
  };

  const getUniqueValues = (rows, columnName) => {
    return Array.from(new Set(rows.map((row) => row[columnName])));
  };

 let statutMatch;
  
  const filteredRows = rows.filter((row) => {
    const demandeurMatch = row.demandeur.toLowerCase().includes(demandeurFilter.toLowerCase());

    const occupationMatch = row.occupation.toLowerCase().includes(occupationFilter.toLowerCase());
    const autorisationMatch = row.autorisation.toLowerCase().includes(autorisationFilter.toLowerCase());
    const arrondissementMatch = row.commune.toLowerCase().includes(arrondissementFilter.toLowerCase());
    if(statutFilter !=''){
      statutMatch= showStatus ? row.statut.toLowerCase() === statutFilter.toLowerCase() : true;

    }
    else{
      statutMatch= showStatus ? row.statut.toLowerCase().includes( statutFilter.toLowerCase()) : true;

    }
  
    return demandeurMatch && occupationMatch && autorisationMatch && arrondissementMatch && statutMatch;
  });

  const buttonStyle = {
    width: '50px',
    height: '50px', 
    margin: '0 8px',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'YourFont, sans-serif',
    borderRadius: '50%', 
  };


  const handleOpenReasonDialogRejetee = (id) => {
    setSelectedRowId(id);
    setOpenReasonDialogRejetee(true);
  };

  const handleOpenReasonDialogDefavorable = (id) => {
    setSelectedRowId(id);
    setOpenReasonDialogDefavorable(true);
  };

  const handleCloseReasonDialogRejetee = () => {
    setSelectedRowId(null);
    setOpenReasonDialogRejetee(false);
  };

  const handleCloseReasonDialogDefavorable = () => {
    setSelectedRowId(null);
    setOpenReasonDialogDefavorable(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const CenteredLoading = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });

  const handleAction = (id, action) => {
    if (action === 'reject') {
      handleOpenReasonDialogRejetee(id);
    }
    else if (action === 'Accepter'){
      console.log(`${action} clicked for row with ID: ${id}`);
      axios.post('http://localhost:8085/demandes/updateStatut', {
        num_demande: id,
        id_statut: 1,
        motif :''
      })
      .then(response => {
        console.log('Update successful:', response.data);
        setHiddenRows([...hiddenRows, id]); 

      })
      .catch(error => {
        console.error('Update error:', error);
      });
    }
    else if (action === 'Défavorable') {
      handleOpenReasonDialogDefavorable(id);
    } 
    else if (action === 'Favorable'){
      console.log(`${action} clicked for row with ID: ${id}`);
      axios.post('http://localhost:8085/demandes/updateStatut', {
        num_demande: id,
        id_statut: 5,
        motif :''
      })
      .then(response => {
        console.log('Update successful:', response.data);
        setHiddenRows([...hiddenRows, id]);

      })
      .catch(error => {
        console.error('Update error:', error);
      });
    }
  };

  const handleReject = () => {

    console.log(`Rejection reason for row with ID ${selectedRowId}: ${rejectionReason}`);
    handleCloseReasonDialogRejetee();

    axios.post('http://localhost:8085/demandes/updateStatut', {
      num_demande: selectedRowId,
      id_statut:2,
      motif: rejectionReason,
    })
    .then(response => {
      console.log('Update successful:', response.data);
      setHiddenRows([...hiddenRows, selectedRowId]);

    })
    .catch(error => {
      console.error('Update error:', error);
    });


    }

    const handleDefavorable = () => {
      console.log(`Defavorable reason for row with ID ${selectedRowId}: ${defavorableReason}`);
      handleCloseReasonDialogDefavorable();

    axios.post('http://localhost:8085/demandes/updateStatut', {
      num_demande: selectedRowId,
      id_statut:6,
      motif: defavorableReason,
    })
    .then(response => {
      console.log('Update successful:', response.data);
      setHiddenRows([...hiddenRows, selectedRowId]);

    })
    .catch(error => {
      console.error('Update error:', error);
    });



   }
   

   



  const [rejectionReason, setRejectionReason] = useState('');

  const [defavorableReason, setDefavorableReason] = useState('');


  const showPdf = (base64String) => {
    const pdfWindow = window.open('');
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64String}'></iframe>`
    );
  };



  return (
    <React.Fragment>
      <TitleChart>{title}</TitleChart>

      <TableHead>
        <TableRow>
        <TableCell>
        <FormControl fullWidth style={{ marginBottom: '10px', width: '225px' }}>
  <InputLabel
    id="demandeur-filter-label"
    style={{
      visibility: demandeurFilter ? 'hidden' : 'visible',
    }}
  >
    Filtrer par demandeur
  </InputLabel>
  <Autocomplete
    id="demandeur-filter"
    options={getUniqueValues(rows, 'demandeur')}
    value={demandeurFilter || ''}
    onChange={(event, newValue) => {
      const selectedValue = newValue || ''; 
      handleFilterChange({ target: { value: selectedValue } }, setDemandeurFilter);
    }}
    renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
  />
</FormControl>

</TableCell>

          <TableCell>
          <FormControl fullWidth style={{ marginBottom: '10px', width: '225px' }}>

              <InputLabel id="occupation-filter-label" style={{
      visibility: occupationFilter ? 'hidden' : 'visible',
    }} >Filtrer par occupation</InputLabel>
              <Autocomplete
  id="occupation-filter"
  options={getUniqueValues(rows, 'occupation')}
  value={occupationFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || ''; 
    handleFilterChange({ target: { value: selectedValue } }, setOccupationFilter);
  }}
  renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
/>
             
            </FormControl>
          </TableCell>

        

          <TableCell>
          <FormControl fullWidth style={{ marginBottom: '10px', width: '225px' }}>
              <InputLabel id="autorisation-filter-label" style={{
      visibility: autorisationFilter ? 'hidden' : 'visible',
      // Add other styling as needed
    }}>Filtrer par autorisation</InputLabel>
               <Autocomplete
  id="autorisation-filter"
  options={getUniqueValues(rows, 'autorisation')}
  value={autorisationFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || '';  
    handleFilterChange({ target: { value: selectedValue } }, setAutorisationFilter);
  }}
  renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
/>
            </FormControl>
          </TableCell>

          <TableCell>
          <FormControl fullWidth style={{ marginBottom: '10px', width: '225px' }}>
              <InputLabel id="arrondissement-filter-label"  style={{
      visibility: arrondissementFilter ? 'hidden' : 'visible',
    }}>Filtrer par arrondissement</InputLabel>
              <Autocomplete
  id="arrondissement-filter"
  options={getUniqueValues(rows, 'commune')}
  value={arrondissementFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || ''; 
    handleFilterChange({ target: { value: selectedValue } }, setArrondissementFilter);
  }}
  renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
/>
            </FormControl>
          </TableCell>

          {showStatus &&(
               <TableCell>
               <FormControl fullWidth style={{ marginBottom: '10px', width: '180px' }}>
                 <InputLabel id="statut-filter-label" style={{
      visibility: statutFilter ? 'hidden' : 'visible',
    }}>Filtrer par statut</InputLabel>
    <Autocomplete
  id="statut-filter"
  options={getUniqueValues(rows, 'statut')}
  value={statutFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || ''; 
    handleFilterChange({ target: { value: selectedValue } }, setStatutFilter);
  }}
  renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps }} />}
/>
                
               </FormControl>
             </TableCell>)}

      

          </TableRow>
      </TableHead>

     
      {loading ? (
         <CenteredLoading>
         <CircularProgress />
       </CenteredLoading>) : (
      <Table size="medium"  >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 15 }}>Numéro de demande</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Demandeur</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>CIN</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Autorisation</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Occupation</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Arrondissement</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Date</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Pièces jointes</StyledTableCell>

            {showStatus &&(<StyledTableCell align="right" sx={{ fontSize: 15 }}>Statut</StyledTableCell>)}
            {showMotif &&(<StyledTableCell align="right" sx={{ fontSize: 15 }}>Motif</StyledTableCell>)}
            {showActions &&(<StyledTableCell align="center" sx={{ fontSize: 15 }}>Actions</StyledTableCell>)}
            {showAvis &&(<StyledTableCell align="center" sx={{ fontSize: 15 }}>Avis</StyledTableCell>)}



          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
          !hiddenRows.includes(row.id) &&(
            <StyledTableRow key={row.id}>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.num}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.demandeur}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.cin}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.autorisation}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.occupation}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.commune}</StyledTableCell>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.date}</StyledTableCell>
              <StyledTableCell align="center" sx={{ fontSize: 15 }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
    <Button
      variant="contained"
      color="primary"
      sx={{ ...buttonStyle }}
      onClick={() => showPdf(row.piece_jointe_1)}
      disabled={row.piece_jointe_1 === null}

    >
      CIN
    </Button>
    <Button
      variant="contained"
      color="warning" 
      sx={{ ...buttonStyle }}
      onClick={() => showPdf(row.piece_jointe_2)}
      disabled={row.piece_jointe_2 === null}


    >
      Demande
    </Button>
    <Button
      variant="contained"
      color="success" 
      sx={{ ...buttonStyle }}
      onClick={() => showPdf(row.piece_jointe_3)}
      disabled={row.piece_jointe_3 === null}


    >
      Titre foncier
    </Button>
    </div>
  </StyledTableCell>
              {showStatus &&( <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.statut}</StyledTableCell>)}
              {showMotif &&( <StyledTableCell align="right" sx={{ fontSize: 16 }}>{row.motif}</StyledTableCell>)}
              {showActions && (
  <StyledTableCell align="center" sx={{ fontSize: 15 }}>
    <Button
      variant="contained"
      color="primary" 
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Accepter')}
    >
      Accepter
    </Button>
    <Button
      variant="contained"
      color="secondary"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'reject')}
    >
      Rejeter
    </Button>
  </StyledTableCell>
)}
{showAvis && (
  <StyledTableCell align="center" sx={{ fontSize: 15 }}>
    <Button
      variant="contained"
      color="primary"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Favorable')}
    >
    Favorable
    </Button>
    <Button
      variant="contained"
      color="secondary"
      sx={{ width: '120px', margin: '0 8px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
      onClick={() => handleAction(row.id, 'Défavorable')}
    >
      Défavorable
    </Button>
  </StyledTableCell>
)}


            </StyledTableRow> )
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

<Dialog open={openReasonDialogRejetee} onClose={handleCloseReasonDialogRejetee} fullWidth maxWidth="md">
  <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}>
    Saisir le motif de rejet
  </DialogTitle>
  <DialogContent>
    <TextField
      multiline
      rows={4}
      fullWidth
      label="Motif"
      variant="outlined"
      value={rejectionReason}
      onChange={(e) => setRejectionReason(e.target.value)}
      sx={{ fontSize: '18px', fontFamily: 'YourFont, sans-serif' }}
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleCloseReasonDialogRejetee}
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Annuler
    </Button>
    <Button
      onClick={handleReject}
      variant="contained"
      color="secondary"
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Rejeter
    </Button>
  </DialogActions> 
</Dialog>


<Dialog open={openReasonDialogDefavorable} onClose={handleCloseReasonDialogDefavorable} fullWidth maxWidth="md">
  <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}>
    Saisir le motif
  </DialogTitle>
  <DialogContent>
    <TextField
      multiline
      rows={4}
      fullWidth
      label="Motif"
      variant="outlined"
      value={defavorableReason}
      onChange={(e) => setDefavorableReason(e.target.value)}
      sx={{ fontSize: '18px', fontFamily: 'YourFont, sans-serif' }}
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleCloseReasonDialogDefavorable}
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Annuler
    </Button>
    <Button
      onClick={handleDefavorable}
      variant="contained"
      color="secondary"
      sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'YourFont, sans-serif' }}
    >
      Avis Défavorable
    </Button>
  </DialogActions>
</Dialog>



    </React.Fragment>
  );
}
