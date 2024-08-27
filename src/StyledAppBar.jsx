

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import logo from "./assets/eureko-logo-blue.Du66WmD1.svg";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';

function StyledAppBar() {
  return (
    <>
      <Grid container justifyContent="center" sx={{ backgroundColor: "#273a7e", height: "45px", color: "#ffffff" }}>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <PhoneIcon sx={{ fontSize: "14px", marginRight: "5px" }} />
            <Typography sx={{ fontSize: "14px" }}>0850 222 66 60</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: "14px" }}>Blog</Typography>
          </Grid>
          <Grid sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <WhatsAppIcon sx={{ fontSize: "14px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "14px" }}>Eureko WhatsApp</Typography>
            </Grid>
            <Typography sx={{ fontSize: "14px" }}>Şirketiniz İçin Eureko</Typography>
            <Typography sx={{ fontSize: "14px" }}>EN</Typography>
          </Grid>
        </Grid>
      </Grid>

      <AppBar position="sticky" color="inherit" sx={{
          backgroundColor: "#f8f8f8",
          height: "62px",
          alignContent: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px #0000001a!important"
        }} elevation={0}>
        <Grid container justifyContent="center">
          <Grid item xs={8} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <img src={logo} width={128} alt="Eureko Sigorta Logo" />
            <Grid item xs={8} sx={{ display: "flex", gap: "20px" }}>
              <Typography sx={{ fontSize: "15px", color: "inherit", fontFamily: "Chalet Title, sans-serif" }}>Ürünlerimiz</Typography>
              <Typography sx={{ fontSize: "15px", color: 'inherit', fontFamily: "Chalet Title, sans-serif" }}>Yardım Merkezi</Typography>
            </Grid>
            <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <SearchIcon sx={{ fontSize: "20px", color: "#273a7e" }} />
<Button
  variant="contained"
  sx={{ 
    backgroundColor: "#273a7e", 
    color: "#fff",
    '&:hover': {
      backgroundColor: "#273a7e", 
    },
  }}
>
  Giriş Yap
</Button>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

export default StyledAppBar;

