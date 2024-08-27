

import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InformationPersonel from "./components/InformationPersonel";
import SmsVerification from "./components/SmsVerification";
import TravelInformation from "./components/TravelInformation";
import Guarantee from "./components/Guarantee";
import Offer from "./components/Offer";
import BuyNow from "./components/BuyNow";
import StyledAppBar from "./StyledAppBar";
import CoverationInformation from "./components/CoverationInformation";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "./redux/travelSlice";
import Footer from "./Footer";

const steps = [
  { label: "Kişisel Bilgiler" },
  { label: "Sms Doğrulaması" },
  { label: "Seyahat Bilgisi" },
  { label: "Teminatlar" },
  { label: "Teklif" },
  { label: "Satın Al" },
];

function App() {
  const dispatch = useDispatch();
  const activeStep = useSelector((root) => root.travel.activeStep);

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleReset = () => {
    dispatch(setActiveStep(0));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar />
      <Box component="main" sx={{ flex: 1, p: 2 }}>
        <Grid container spacing={1}>
          <Grid container spacing={0} item xs={4}>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}></Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#f9f9f9",
                  flexDirection: "column",
                  height: "fit-content",
                  display: "flex",
                  flex: "1 1 auto",
                  float: "right",
                  border: "1px solid #ededed",
                  padding: "12px 40px",
                }}
              >
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  sx={{
                    "& .MuiStepIcon-root": { color: "gray" },
                    "& .Mui-active": { color: "green" },
                    "& .MuiStepIcon-active": { color: "green" },
                    "& .MuiStepIcon-completed": { color: "green" },
                    "& .MuiStepConnector-root .MuiStepConnector-line": { borderColor: "green" },
                    "& .MuiStepConnector-line": { borderColor: "green", minHeight: 0 },
                    "& .MuiStepConnector-active .MuiStepConnector-line": { borderColor: "green" },
                    "& .MuiStepConnector-completed .MuiStepConnector-line": { borderColor: "green" },
                    "& .MuiStepLabel-label": { color: "black" },
                    "& .MuiStepLabel-active": { color: "blue" },
                    "& .MuiStepLabel-completed": { color: "green" },
                  }}
                >
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        <Box sx={{ mb: 2 }}>
                          <div></div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Sıfırla
                  </Button>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} sx={{ border: "1px solid #ededed" }}>
              {activeStep === 0 && <InformationPersonel onNext={handleNext} onBack={handleBack} />}
              {activeStep === 1 && <SmsVerification onNext={handleNext} onBack={handleBack} />}
              {activeStep === 2 && <TravelInformation onNext={handleNext} onBack={handleBack} />}
              {activeStep === 3 && <Guarantee onNext={handleNext} onBack={handleBack} />}
              {activeStep === 4 && <Offer onNext={handleNext} onBack={handleBack} />}
              {activeStep === 5 && <BuyNow onNext={handleNext} onBack={handleBack} />}
            </Paper>
          </Grid>
          <Grid container item xs={4}>
            {(activeStep === 3 || activeStep === 4) && (
              <Grid item xs={6}>
                <Paper elevation={0} sx={{ border: "1px solid #ededed" }}>
                  <CoverationInformation onNext={handleNext} onBack={handleBack} />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box component="footer" sx={{ pt: 2, bgcolor: "#f9f9f9", mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
