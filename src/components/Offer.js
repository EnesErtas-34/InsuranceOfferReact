import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setPolicyID } from "../redux/travelSlice";
import Swal from 'sweetalert2';

const Offer = ({ onNext }) => {
  const dispatch = useDispatch();
  const { dateRange, assurances, selectedAssurances, totalPrice, userID } = useSelector(state => state.travel);

  const formattedDateRange = dateRange && dateRange[0] && dateRange[1]
    ? `${dayjs(dateRange[0]).format('DD/MM/YYYY')} - ${dayjs(dateRange[1]).format('DD/MM/YYYY')}`
    : "Sigorta tarihi seçilmedi";

  const selectedAssuranceList = assurances.filter(assurance => selectedAssurances[assurance.assuranceCode]);


  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{ backgroundColor: "#f9f9f9" }}>
      <Box flex={1} mr={2}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Teklifiniz
          </Typography>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              <strong>Ürün Adı</strong>
            </Typography>
            <Typography variant="body2">
              {selectedAssuranceList.length > 0 && selectedAssuranceList[selectedAssuranceList.length - 1].title}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              <strong>Sigorta Tarihi</strong>
            </Typography>
            <Typography variant="body2">
              {formattedDateRange}
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              <strong>Teminat Bedeli</strong>
            </Typography>
            <Typography variant="body2">₺{totalPrice.toFixed(2)}</Typography>
          </Box>
          <Typography variant="h6" gutterBottom>
            Teminatlar
          </Typography>
          <List>
            {selectedAssuranceList.map(assurance => (
              <ListItem key={assurance.assuranceCode}>
                <ListItemIcon>
                  <CheckCircleIcon style={{ color: green[500] }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div dangerouslySetInnerHTML={{ __html: assurance.description }} />
                  }
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="body2" color="primary">
            Tüm Teminatları Gör
          </Typography>
        </Paper>
      </Box>
    
      {/* <Box flex={0.3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Teminat Kapsamı
          </Typography>
          {selectedAssuranceList.map(assurance => (
            <FormControlLabel
              key={assurance.assuranceCode}
              control={<Checkbox checked={true} />}
              label={`${assurance.title} ₺${assurance.price}`}
            />
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" color="primary" gutterBottom>
            PRİM TUTARI ₺{totalPrice.toFixed(2)}
          </Typography>
          <Button onClick={handlePurchase} variant="contained" color="primary" fullWidth>
            Satın Al
          </Button>
        </Paper>
      </Box> */}
    </Box>
  );
};

export default Offer;