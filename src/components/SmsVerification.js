import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Button, Typography } from "@mui/material";
import Swal from 'sweetalert2';
import axios from 'axios';

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
}));

export default function SmsVerification({ onBack, onNext }) {
  const [seconds, setSeconds] = React.useState(60);
  const [inputCode, setInputCode] = React.useState("");

  React.useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      console.log(`Gönderilen kod: ${inputCode}`); 
      const response = await axios.post('https://localhost:44397/api/Verification/search', { Code: inputCode });
      console.log(response.data); 
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Doğrulama başarılı',
        });
        onNext();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Şifre doğru değil',
        });
      }
    } catch (error) {
      console.error(error); 
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Bir hata oluştu, lütfen tekrar deneyiniz',
      });
    }
  };

  return (
    <CustomPaper elevation={3}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2 }}
            >
              Telefonunuza Gelen Kodu Giriniz
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                style={{ width: "200px" }}
                size='small'
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Paper elevation={1} style={{ padding: '10px', width: '80px', textAlign: 'center' }}>
                {`00:${seconds < 10 ? `0${seconds}` : seconds}`}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} container justifyContent="center" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={onBack} sx={{ mt: 2, width: '100px' }}>
                Geri
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '100px' ,backgroundColor: "#273a7e",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#273a7e",
                  }, }}>
                Devam
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </CustomPaper>
  );
}
