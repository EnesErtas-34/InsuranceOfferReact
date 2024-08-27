  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Box, Checkbox, FormControlLabel, Button, Paper, Divider, InputLabel } from '@mui/material';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { useDispatch, useSelector } from 'react-redux';
  import { setAssurances, toggleAssuranceSelection } from '../redux/travelSlice';
  
  const Guarantee = ({ onNext }) => {
    const dispatch = useDispatch();
    const assurances = useSelector(state => state.travel.assurances);
    const selectedAssurances = useSelector(state => state.travel.selectedAssurances);
    const [localAssurances, setLocalAssurances] = useState([]);
  
    useEffect(() => {
      axios.get('https://localhost:44397/api/Assurance/getall')
        .then(response => {
          if (response.data.data) {
            setLocalAssurances(response.data.data);
            dispatch(setAssurances(response.data.data)); // Assurances'ı Redux'a kaydediyoruz
  
            const initialSelection = {};
            response.data.data.forEach(assurance => {
              initialSelection[assurance.assuranceCode] = assurance.isRequired;
              if (assurance.isRequired) {
                dispatch(toggleAssuranceSelection({
                  assuranceCode: assurance.assuranceCode,
                  isSelected: true,
                  price: assurance.price
                }));
              }
            });
  
          }
        })
        .catch(error => {
          console.error("Error fetching data", error);
        });
    }, [dispatch]);
  
    const handleCheckboxChange = (assurance) => {
      const isSelected = !selectedAssurances[assurance.assuranceCode];
      dispatch(toggleAssuranceSelection({
        assuranceCode: assurance.assuranceCode,
        isSelected: isSelected,
        price: assurance.price
      }));
    };
  
    // const calculateTotalPrice = () => {
    //   return assurances.reduce((total, assurance) => {
    //     if (selectedAssurances[assurance.assuranceCode]) {
    //       return total + assurance.price;
    //     }
    //     return total;
    //   }, 0).toFixed(2);
    // };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box backgroundColor="#f9f9f9" display="flex" justifyContent="space-between" p={2}>
          <Box flex={1} mr={2}>
            <Paper  elevation={0} sx={{ p: 2 }}>
              <InputLabel>Teminatlar</InputLabel>
              {localAssurances.map(assurance => (
                <Box  key={assurance.assuranceCode} border={2} borderColor="#8bbe41"  borderRadius={2} p={2} mb={2}>
                  <InputLabel sx={{ color: '#8bbe41'}}>{assurance.title}</InputLabel>
                  <div 
                    dangerouslySetInnerHTML={{ __html: assurance.description }} 
                  />
                  <InputLabel >Prim Tutarı: ₺{assurance.price}</InputLabel>
                  {assurance.isRequired ? (
                    <Button variant="outlined" disabled>
                      Zorunlu
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#273a7e', color: '#fff', '&:hover': { backgroundColor: '#273a7e' } }}
                      onClick={(onNext) => handleCheckboxChange(assurance)}
                    >
                      {selectedAssurances[assurance.assuranceCode] ? "Çıkar" : "Ekle"}
                    </Button>
                  )}
                </Box>  
              ))}
            </Paper>
          </Box>
         
        </Box>
      </LocalizationProvider>
    );
  };
  
  export default Guarantee;
  