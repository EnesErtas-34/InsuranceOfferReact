import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOption1, toggleOption2, setDateRange } from '../redux/travelSlice';
import dayjs from 'dayjs';
import { Grid, Paper } from '@mui/material';

const TravelInformation = ({ onBack, onNext }) => {
  const dispatch = useDispatch();
  const { option1, option2, dateRange } = useSelector((state) => state.travel);

  const handleOption1Change = () => {
    dispatch(toggleOption1());
  };

  const handleOption2Change = () => {
    dispatch(toggleOption2());
  };

  const handleDateChange = (newDateRange) => {
    // Dayjs nesnelerini string formatına dönüştürme
    const serializedDateRange = newDateRange.map(date => date ? date.toISOString() : null);
    dispatch(setDateRange(serializedDateRange)); // String olarak Redux state'ine kaydet
  };

  // State'teki string tarihleri dayjs nesnesine dönüştürme
  const formattedDateRange = dateRange.map(date => date ? dayjs(date) : null);

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      sx={{
        px: 6,
      }}
    >
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" maxWidth="500px" p={2} borderRadius={2} bgcolor="#fff">
              <Typography variant="h6" gutterBottom>
                Lütfen seyahatle ilgili bilgileri girin.
              </Typography>
              <Box display="flex" flexDirection="column" width="100%" mb={2}>
                <Paper elevation={1} sx={{ mb: 2, p: 0.2, width: '100%', border: '1px solid #ddd', borderRadius: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={option1} 
                        onChange={handleOption1Change} 
                        name="option1" 
                      />
                    }
                    label="Schengen ve Tüm Dünya (ABD, Japonya Hariç)"
                    sx={{ width: '100%' }}
                  />
                </Paper>
                <Paper elevation={1} sx={{ p: 0.2, width: '100%', border: '1px solid #ddd', borderRadius: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={option2} 
                        onChange={handleOption2Change} 
                        name="option2" 
                      />
                    }
                    label="Schengen ve Tüm Dünya (ABD, Japonya Dahil)"
                    sx={{ width: '100%' }}
                  />
                </Paper>
              </Box>
              <StaticDateRangePicker
                value={formattedDateRange}
                onChange={handleDateChange}
                calendars={1}
                displayStaticWrapperAs="desktop"
                sx={{
                  width: '100%',
                  [`& .MuiPickersDateRangeCalendar-root`]: {
                    justifyContent: 'center',
                  },
                  [`& .MuiPickersStaticWrapper-root`]: {
                    width: '100%',
                  },
                }}
              />
              <Typography variant="caption" color="error" display="block" mt={2} mb={2} textAlign="center">
                Lütfen gidiş ve dönüş tarihlerini ayrı ayrı seçiniz.
              </Typography>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Button variant="outlined" onClick={onBack} sx={{ width: '48%' }}>
                  Geri
                </Button>
                <Button variant="contained" color="primary" onClick={onNext} sx={{ width: '48%', backgroundColor: "#273a7e",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#273a7e",
                  }, }}>
                  Devam
                </Button>
              </Box>
            </Box>
          </Box>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default TravelInformation;

