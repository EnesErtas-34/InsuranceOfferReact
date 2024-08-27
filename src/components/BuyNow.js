//ödeme doğrusu
import React from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, Button, Paper } from '@mui/material';
import { green } from '@mui/material/colors';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';
import Swal from 'sweetalert2';
import { basicSchema } from '../schemas/index';

const BuyNow = () => {
  const { dateRange, totalPrice, userID, policyID } = useSelector(state => state.travel);

  const handleCardNameInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
  };

  const handleCardNumberInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = value;
  };

  const handleExpiryDateInput = (e) => {
    const value = e.target.value.replace(/[^0-9/]/g, '');
    if (value.length === 2 && !value.includes('/')) {
      e.target.value = `${value}/`;
    }
  };

  const handleSubmit = async (values) => {
    if (!policyID) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Poliçe ID bulunamadı, lütfen tekrar deneyin.',
      });
      return;
    }

    try {
      const [month, year] = values.expiryDate.split('/');
      const formattedDate = dayjs().set('month', parseInt(month, 10) - 1).set('year', `20${year}`).format('YYYY-MM-DD'); // ISO formatında tarih
  
      const response = await axios.post('https://localhost:44397/api/Pay/add', {
        PolicyID: policyID,  
        InsuredID: userID,
        KartNo: values.cardNumber.replace(/\s/g, ''),
        ExpirationDate: formattedDate,
        CVC: values.cvc,
      });

      Swal.fire({
        icon: 'success',
        title: 'Ödeme Başarılı İyi Seyahatler.',
        text: response.data.Message,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Başarısız',
        text: error.response?.data?.Message || 'Bir hata oluştu. Lütfen tekrar deneyin.',
      });
    }
  };

  const formattedDateRange = dateRange && dateRange[0] && dateRange[1]
    ? `${dayjs(dateRange[0]).format('DD/MM/YYYY')} - ${dayjs(dateRange[1]).format('DD/MM/YYYY')}`
    : "Sigorta tarihi seçilmedi";

  return (
    <Formik
      initialValues={{
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        policyInfo: false,
        agreement:false,
      }}
      validationSchema={basicSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box backgroundColor="#f9f9f9" display="flex" justifyContent="center" p={2}>
            <Box flex={1} maxWidth={600}>
              <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
                <Typography variant="h6" gutterBottom>
                  Seyahat Sağlık Sigortası
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formattedDateRange} vadeli teklifiniz için hesaplanmış Eureko Sigorta - Seyahat Sağlık Sigortası Teklif Prim
                </Typography>
                <Typography variant="h5" color={green[500]} align="right">
                  PRİM TUTARI ₺{totalPrice.toFixed(2)}
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                <Typography variant="h6" gutterBottom>
                  Ödeme
                </Typography>
                <Box sx={{ backgroundColor: '#f9f9f9', p: 2 }}>
                  <Field
                    as={TextField}
                    name="cardName"
                    fullWidth
                    label="Kart Sahibinin Adı ve Soyadı"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    error={touched.cardName && !!errors.cardName}
                    helperText={touched.cardName && errors.cardName}
                    onInput={handleCardNameInput}
                  />
                  <Field
                    as={TextField}
                    name="cardNumber"
                    fullWidth
                    label="Kart Numarası"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    error={touched.cardNumber && !!errors.cardNumber}
                    helperText={touched.cardNumber && errors.cardNumber}
                    onInput={handleCardNumberInput}
                  />
                  <Field
                    as={TextField}
                    name="expiryDate"
                    fullWidth
                    label="Son Kullanma Tarihi (Ay/Yıl)"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    error={touched.expiryDate && !!errors.expiryDate}
                    helperText={touched.expiryDate && errors.expiryDate}
                    onInput={handleExpiryDateInput}
                  />
                  <Field
                    as={TextField}
                    name="cvc"
                    fullWidth
                    label="CVC"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    error={touched.cvc && !!errors.cvc}
                    helperText={touched.cvc && errors.cvc}
                  />
                </Box>
                <FormControlLabel
                  control={<Field as={Checkbox} name="agreement" />}
                  label="Mesafeli Satış Sözleşmesini okudum ve onaylıyorum"
                  sx={{ mb: 1, backgroundColor: '#f9f9f9' }}
                  
                />
               

                <FormControlLabel
                  control={<Field as={Checkbox} name="policyInfo" />}
                  label="Poliçe Bilgilendirme Metnini okudum ve onaylıyorum"
                  sx={{ mb: 2, backgroundColor: '#f9f9f9' }}
                />
                <Button variant="contained"  fullWidth type="submit" 
                  sx={{ backgroundColor: '#273a7e', color: '#fff', '&:hover': { backgroundColor: '#273a7e' } }}
                >
                  Satın Al
                </Button>
              </Paper>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BuyNow;
