import * as React from 'react';
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
import { useState } from 'react';


import TextField from '@mui/material/TextField';  // Add this import
import DialogActions from '@mui/material/DialogActions';
import {Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';








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





export default function Orders({title, rows, paginationEnabled, showStatus, showMotif, loading}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const [occupationFilter, setOccupationFilter] = useState('');
  const [autorisationFilter, setAutorisationFilter] = useState('');
  const [arrondissementFilter, setArrondissementFilter] = useState('');
  const [statutFilter, setStatutFilter] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (event, filterFunction) => {
    filterFunction(event.target.value);
  };

  const getUniqueValues = (rows, columnName) => {
    return Array.from(new Set(rows.map((row) => row[columnName])));
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const buttonStyle = {
    width: '50px',
    height: '50px', // Set height equal to width to make the button circular
    margin: '0 8px',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'YourFont, sans-serif',
    borderRadius: '50%', // Make the button circular
  };

  const showPdf = (base64String) => {
    const pdfWindow = window.open('');
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${base64String}'></iframe>`
    );
  };

  let statutMatch;
  
  const filteredRows = rows.filter((row) => {

    const occupationMatch = row.occupation.toLowerCase().includes(occupationFilter.toLowerCase());
    const autorisationMatch = row.autorisation.toLowerCase().includes(autorisationFilter.toLowerCase());
    const arrondissementMatch = row.commune.toLowerCase().includes(arrondissementFilter.toLowerCase());
    if(statutFilter !=''){
      statutMatch= showStatus ? row.statut.toLowerCase() === statutFilter.toLowerCase() : true;

    }
    else{
      statutMatch= showStatus ? row.statut.toLowerCase().includes( statutFilter.toLowerCase()) : true;

    }
  
    return  occupationMatch && autorisationMatch && arrondissementMatch && statutMatch;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const CenteredLoading = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });

  return (
    <React.Fragment>
      <TitleChart>{title}</TitleChart>
      <TableHead>
        <TableRow>
        
          <TableCell sx={{ fontSize: '16px', width: '250px' }}>
          <FormControl fullWidth style={{ marginBottom: '10px', width: '225px' }}>

              <InputLabel id="occupation-filter-label" style={{
      visibility: occupationFilter ? 'hidden' : 'visible',
      // Add other styling as needed
    }} >Filtrer par occupation</InputLabel>
              <Autocomplete
  id="occupation-filter"
  options={getUniqueValues(rows, 'occupation')}
  value={occupationFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || '';  // Set to an empty string if null
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
    const selectedValue = newValue || '';  // Set to an empty string if null
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
      // Add other styling as needed
    }}>Filtrer par arrondissement</InputLabel>
              <Autocomplete
  id="arrondissement-filter"
  options={getUniqueValues(rows, 'commune')}
  value={arrondissementFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || '';  // Set to an empty string if null
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
      // Add other styling as needed
    }}>Filtrer par statut</InputLabel>
    <Autocomplete
  id="statut-filter"
  options={getUniqueValues(rows, 'statut')}
  value={statutFilter || ''}
  onChange={(event, newValue) => {
    const selectedValue = newValue || '';  // Set to an empty string if null
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
      <Table size="small" >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontSize: 20 }}>Num demande</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Autorisation</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Occupation</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Arrondissement</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }}>Date</StyledTableCell>
            <StyledTableCell sx={{ fontSize: 15 }}>Pièces jointes</StyledTableCell>
            {showStatus &&(<StyledTableCell align="right" sx={{ fontSize: 20 }}>Statut</StyledTableCell>)}
            {showMotif &&(<StyledTableCell align="right" sx={{ fontSize: 20 }}>Motif</StyledTableCell>)}

          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell sx={{ fontSize: 16 }}>{row.num}</StyledTableCell>
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
    </React.Fragment>
  );
}
