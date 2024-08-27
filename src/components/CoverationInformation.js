// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Checkbox, FormControlLabel, Button, Paper, Divider, InputLabel, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAssurances, toggleAssuranceSelection, setPolicyID } from '../redux/travelSlice';
// import Swal from 'sweetalert2';
// import dayjs from 'dayjs';
// import jsPDF from 'jspdf';

// function CoverationInformation({ onNext }) {
//     const dispatch = useDispatch();
//     const activeStep = useSelector(state => state.travel.activeStep);
//     const [localAssurances, setLocalAssurances] = useState([]);
//     const { dateRange, assurances, selectedAssurances, totalPrice, userID } = useSelector(state => state.travel);

//     useEffect(() => {
//         axios.get('https://localhost:44397/api/Assurance/getall')
//             .then(response => {
//                 if (response.data.data) {
//                     setLocalAssurances(response.data.data);
//                     dispatch(setAssurances(response.data.data));

//                     const initialSelection = {};
//                     response.data.data.forEach(assurance => {
//                         initialSelection[assurance.assuranceCode] = assurance.isRequired;
//                         if (assurance.isRequired) {
//                             dispatch(toggleAssuranceSelection({
//                                 assuranceCode: assurance.assuranceCode,
//                                 isSelected: true,
//                                 price: assurance.price
//                             }));
//                         }
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error("Error fetching data", error);
//             });
//     }, [dispatch]);

//     const handleCheckboxChange = (assurance) => {
//         const isSelected = !selectedAssurances[assurance.assuranceCode];
//         dispatch(toggleAssuranceSelection({
//             assuranceCode: assurance.assuranceCode,
//             isSelected: isSelected,
//             price: assurance.price
//         }));
//     };

//     const calculateTotalPrice = () => {
//         return assurances.reduce((total, assurance) => {
//             if (selectedAssurances[assurance.assuranceCode]) {
//                 return total + assurance.price;
//             }
//             return total;
//         }, 0).toFixed(2);
//     };

//     const handlePurchase = async () => {
//         const policyData = {
//             insuredID: userID,
//             insurerID: userID, 
//             price: totalPrice,
//             startDate: dateRange[0] ? dayjs(dateRange[0]).toISOString() : null,
//             endDate: dateRange[1] ? dayjs(dateRange[1]).toISOString() : null,
//             offer: true,
//         };

//         try {
//             const response = await axios.post('https://localhost:44397/api/Policy/add', policyData);
//             const policyID = response.data.data;


//             if (response.status === 200 && policyID) {
//                 dispatch(setPolicyID(policyID)); 

//                 // PDF oluşturma
//                 generatePDF({
//                     ...policyData,
//                     policyID // Poliçe ID'sini PDF verilerine ekliyoruz
//                 }); 

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Başarılı',
//                     text: 'Poliçe başarıyla oluşturuldu.',
//                 }).then(() => {
//                     onNext();  
//                 });
//             } else {
//                 console.error('Poliçe kaydedilemedi, yanıt:', response.data);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Hata',
//                     text: `Poliçe ID alınamadı. Yanıt: ${JSON.stringify(response.data)}`,
//                 });
//             }
//         } catch (error) {
//             console.error('Poliçe kaydedilemedi:', error.response ? error.response.data : error.message);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Hata',
//                 text: error.response ? `Ödeme işlemi sırasında bir hata oluştu: ${JSON.stringify(error.response.data)}` : 'Poliçe kaydedilemedi, lütfen tekrar deneyin.',
//             });
//         }
//     };

//     const generatePDF = (policyData) => {
//         const doc = new jsPDF();
//         const title = 'Poliçe Bilgileri';

//         doc.setFontSize(18);
//         doc.text(title, 10, 10);

//         doc.setFontSize(14);
//         if (isOwnPolicy()) { // Kendi poliçesi mi?
//             doc.text(`Sigortalı ID: ${policyData.insuredID}`, 10, 30);
//         } else { // Başkası için poliçe
//             doc.text(`Sigortacı ID: ${policyData.insurerID}`, 10, 30);
//         }
//         doc.text(`Poliçe ID: ${policyData.policyID}`, 10, 40); 

//         doc.text(`Toplam Fiyat: ₺${policyData.price}`, 10, 50);

//         doc.text(`Başlangıç Tarihi: ${dayjs(policyData.startDate).format('DD/MM/YYYY')}`, 10, 60);
//         doc.text(`Bitiş Tarihi: ${dayjs(policyData.endDate).format('DD/MM/YYYY')}`, 10, 70);

//         doc.save('policy-details.pdf');
//     };

//     const isOwnPolicy = () => {
       
//         return userID === userID; // Örnek kendi poliçem olsun 
//     };

//     return (
//         <Box flex={0.3}>
//             <Paper elevation={0} sx={{ p: 2 }}>
//                 <InputLabel>Teminat Kapsamı</InputLabel>
//                 {localAssurances.filter(x => activeStep === 3 || (activeStep === 4 && selectedAssurances[x.assuranceCode])).map(assurance => (
//                     <FormControlLabel
//                         key={assurance.assuranceCode}
//                         control={
//                             <Checkbox
//                                 disabled={assurance.isRequired}
//                                 checked={!!selectedAssurances[assurance.assuranceCode]}
//                                 onChange={() => handleCheckboxChange(assurance)}
//                             />
//                         }
//                         label={`${assurance.title} ₺${assurance.price}`}
//                     />
//                 ))}
//                 {activeStep === 3 && (
//                     <Button
//                         variant="contained"
//                         sx={{ backgroundColor: '#273a7e', color: '#fff', '&:hover': { backgroundColor: '#273a7e' } }}
//                         fullWidth
//                         onClick={onNext}
//                     >
//                         Teklif Oluştur
//                     </Button>
//                 )}

//                 {activeStep === 4 && (
//                     <>
//                         <Divider sx={{ my: 2 }} />
//                         <Typography variant="h6" color="primary" gutterBottom>
//                             PRİM TUTARI ₺{calculateTotalPrice()}
//                         </Typography>
//                         <Button
//                             onClick={handlePurchase}
//                             variant="contained"
//                             sx={{ backgroundColor: '#273a7e', color: '#fff', '&:hover': { backgroundColor: '#273a7e' } }}
//                             fullWidth
//                         >
//                             Satın Al
//                         </Button>
//                     </>
//                 )}
//             </Paper>
//         </Box>
//     );
// }

// export default CoverationInformation;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Checkbox, FormControlLabel, Button, Paper, Divider, InputLabel, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAssurances, toggleAssuranceSelection, setPolicyID } from '../redux/travelSlice';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import LogoVizyoneks from '../assets/LogoVizyoneks.webp'; 
function CoverationInformation({ onNext }) {
    const dispatch = useDispatch();
    const activeStep = useSelector(state => state.travel.activeStep);
    const [localAssurances, setLocalAssurances] = useState([]);
    const { dateRange, assurances, selectedAssurances, totalPrice, userID } = useSelector(state => state.travel);

    useEffect(() => {
        axios.get('https://localhost:44397/api/Assurance/getall')
            .then(response => {
                if (response.data.data) {
                    setLocalAssurances(response.data.data);
                    dispatch(setAssurances(response.data.data));

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

    const calculateTotalPrice = () => {
        return assurances.reduce((total, assurance) => {
            if (selectedAssurances[assurance.assuranceCode]) {
                return total + assurance.price;
            }
            return total;
        }, 0).toFixed(2);
    };

    const handlePurchase = async () => {
        const policyData = {
            insuredID: userID,
            insurerID: userID, 
            price: totalPrice,
            startDate: dateRange[0] ? dayjs(dateRange[0]).toISOString() : null,
            endDate: dateRange[1] ? dayjs(dateRange[1]).toISOString() : null,
            offer: true,
        };

        try {
            const response = await axios.post('https://localhost:44397/api/Policy/add', policyData);
            const policyID = response.data.data;


            if (response.status === 200 && policyID) {
                dispatch(setPolicyID(policyID)); 

                // PDF oluşturma
                generatePDF({
                    ...policyData,
                    policyID // Poliçe ID'sini PDF verilerine ekliyoruz
                }); 

                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı',
                    text: 'Poliçe başarıyla oluşturuldu.',
                }).then(() => {
                    onNext();  
                });
            } else {
                console.error('Poliçe kaydedilemedi, yanıt:', response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: `Poliçe ID alınamadı. Yanıt: ${JSON.stringify(response.data)}`,
                });
            }
        } catch (error) {
            console.error('Poliçe kaydedilemedi:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: error.response ? `Ödeme işlemi sırasında bir hata oluştu: ${JSON.stringify(error.response.data)}` : 'Poliçe kaydedilemedi, lütfen tekrar deneyin.',
            });
        }
    };

    const generatePDF = (policyData) => {
    const doc = new jsPDF();

    // Add logo
    const imgWidth = 50;
    const imgHeight = 20;
    doc.addImage(LogoVizyoneks, 'PNG', 10, 10, imgWidth, imgHeight);

    // Set title
    doc.setFontSize(18);
    doc.text('Poliçe Bilgileri', 70, 30); // Adjusted positioning

    // Define table columns and rows
    const columns = ["Açıklama", "Detay"];
    const rows = [
        ["Poliçe ID", policyData.policyID],
        ["Sigortalı ID", policyData.insuredID],
        ["Sigortacı ID", policyData.insurerID],
        ["Toplam Fiyat", `₺${policyData.price.toFixed(2)}`],
        ["Başlangıç Tarihi", dayjs(policyData.startDate).format('DD/MM/YYYY')],
        ["Bitiş Tarihi", dayjs(policyData.endDate).format('DD/MM/YYYY')],
    ];

    // Add the table
    doc.autoTable({
        startY: 40, // Starting after the title
        head: [columns],
        body: rows,
        theme: 'grid',
        headStyles: {
            fillColor: [22, 160, 133],
            textColor: [255, 255, 255],
        },
        bodyStyles: {
            fillColor: [239, 239, 239],
        },
    });

    // Save the PDF
    doc.save('policy-details.pdf');
};
    const isOwnPolicy = () => {
       
        return userID === userID; // Örnek kendi poliçem olsun 
    };

    return (
        <Box flex={0.3}>
            <Paper elevation={0} sx={{ p: 2 }}>
                <InputLabel>Teminat Kapsamı</InputLabel>
                {localAssurances.filter(x => activeStep === 3 || (activeStep === 4 && selectedAssurances[x.assuranceCode])).map(assurance => (
                    <FormControlLabel
                        key={assurance.assuranceCode}
                        control={
                            <Checkbox
                                disabled={assurance.isRequired}
                                checked={!!selectedAssurances[assurance.assuranceCode]}
                                onChange={() => handleCheckboxChange(assurance)}
                            />
                        }
                        label={`${assurance.title} ₺${assurance.price}`}
                    />
                ))}
                {activeStep === 3 && (
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#273a7e', color: '#fff', '&:hover': { backgroundColor: '#273a7e' } }}
                        fullWidth
                        onClick={onNext}
                    >
                        Teklif Oluştur
                    </Button>
                )}

                {activeStep === 4 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" color="primary" gutterBottom>
                            PRİM TUTARI ₺{calculateTotalPrice()}
                        </Typography>
                        <Button
                            onClick={handlePurchase}
                            variant="contained"
                            sx={{ backgroundColor: '#273a7e', color: '#fff', '&:hover': { backgroundColor: '#273a7e' } }}
                            fullWidth
                        >
                            Satın Al
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
}

export default CoverationInformation;
