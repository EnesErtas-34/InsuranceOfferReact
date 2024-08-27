import * as React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import YoutubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedinIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <Grid container justifyContent="center" sx={{ backgroundColor: "#273a7e", height: "50px", color: "#ffffff", padding: "8px" }}>
            <Grid item xs={12} sm={10} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Grid sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <IconButton sx={{ color: "#ffffff", p: 0, mr: 0.5 }} size="small">
                        <InstagramIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton sx={{ color: "#ffffff", p: 0, mr: 0.5 }} size="small">
                        <LinkedinIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton sx={{ color: "#ffffff", p: 0, mr: 0.5 }} size="small">
                        <WhatsAppIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton sx={{ color: "#ffffff", p: 0, mr: 0.5 }} size="small">
                        <TwitterIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton sx={{ color: "#ffffff", p: 0, mr: 0.5 }} size="small">
                        <YoutubeIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Grid>
                <Grid sx={{ display: "flex", gap: "8px", alignItems: "center", flexGrow: 1,marginLeft:"400px" }}>
                    <Typography sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Eureko Kalite Politakası</Typography>
                    <Typography sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Risk Değerlendirme</Typography>
                    <Typography sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Çerez Bilgilendirmesi</Typography>
                    <Typography sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>K.V.V.K Aydınlatma Metni</Typography>
                    <Typography sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Bilgi Toplumu Hizmetleri</Typography>
                    <Typography sx={{ fontSize: "10px", whiteSpace: "nowrap" }}>Site Haritası</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Footer;
