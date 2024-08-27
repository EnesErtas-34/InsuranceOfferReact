import * as React from "react";
import {InputLabel,TextField,Checkbox,FormControlLabel,Button,Grid,Box,Paper,Typography, Link,Modal,Fade,Backdrop,} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import axios from "axios";
import { kendimSchema, baskasiSchema } from "../schemas";
import { useDispatch } from "react-redux";
import { setUserID } from "../redux/travelSlice";

const CustomPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.success.main}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.success.main,
  backgroundColor: theme.palette.background.paper,
  marginRight: theme.spacing(1),
  width: "150px",
}));

const handleInput = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const Option = ({ label, checked, onChange, value }) => (
  <CustomPaper>
    <Checkbox checked={checked} onChange={onChange} value={value} />
    <Typography variant="h6" sx={{ fontSize: "0.875rem" }}>
      {label}
    </Typography>
  </CustomPaper>
);

export default function InformationPersonel({ onNext }) {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState("kendim");
  const [openModal, setOpenModal] = React.useState(false);
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const handleChange1 = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal1 = () => {
    setOpenModal1(true);
  };

  const handleCloseModal1 = () => {
    setOpenModal1(false);
  };
  const handleOpenModal2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  const onSubmit = async (values) => {
    try {
      const payload =
        selectedValue === "kendim"
          ? {
              TC: values.tck,
              BirthDate: values.birthday.toISOString(),
              Email: values.email,
              Number: values.phoneNumber,
            }
          : {
              TC: values.tck_sigortali,
              BirthDate: values.birthday_sigortali.toISOString(),
              Email: values.email_sigortali,
              Number: values.phoneNumber_sigortali,
            };

      const response = await axios.post(
        "https://localhost:44397/api/Insured/add",
        payload
      );
      const insuredID = response.data.insuredID;

      if (insuredID) {
        dispatch(setUserID(insuredID)); // Redux state'ine ID'yi kaydeetme
        onNext();
      } else {
        console.error("Kullanıcı kaydedildi ancak ID alınamadı");
      }
    } catch (error) {
      console.error("Kullanıcı kaydedilemedi:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      tck: "",
      birthday: null,
      phoneNumber: "",
      tck_sigortali: "",
      birthday_sigortali: null,
      email_sigortali: "",
      phoneNumber_sigortali: "",
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    },
    validationSchema: selectedValue === "kendim" ? kendimSchema : baskasiSchema,
    onSubmit,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ padding: 3, backgroundColor: "#f9f9f9" }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Seyahat Sağlık Sigortası Teklifi Al
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Kendiniz için mi yoksa bir başkası için mi, Seyahat Sağlık Sigortası
        teklifi almak istiyorsunuz?
      </Typography>
      <Box display="flex" justifyContent="center" mb={2} gap={2}>
        <Option
          label="Kendim için"
          checked={selectedValue === "kendim"}
          onChange={handleChange1}
          value="kendim"
        />
        <Option
          label="Bir başkası için"
          checked={selectedValue === "baskasi"}
          onChange={handleChange1}
          value="baskasi"
        />
      </Box>

      {selectedValue === "kendim" && (
        <Grid
          container
          spacing={1}
          direction="column"
          sx={{
            px: 6,
          }}
        >
          <Grid item xs={12}>
            <InputLabel
              sx={{
                fontWeight: "bold",
              }}
            >
              T.C. Kimlik Numaranız (11 Hane)
            </InputLabel>
            <TextField
              fullWidth
              name="tck"
              value={formik.values.tck}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              error={!!formik.errors.tck && formik.touched.tck}
              size="small"
              helperText={
                formik.touched.tck && formik.errors.tck ? formik.errors.tck : ""
              }
              sx={{
                "& .MuiInputBase-input": {
                  backgroundColor: "#fff", 
                },
              }}
              onInput={handleInput}
            />
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6} md={4}>
              <InputLabel
                sx={{
                  fontWeight: "bold",
                }}
              >
                Doğum Tarihiniz
              </InputLabel>
              <DatePicker
                fullWidth
                name="birthday"
                value={formik.values.birthday}
                onChange={(date) => formik.setFieldValue("birthday", date)}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant="outlined" />
                )}
                size="small"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    backgroundColor: "#fff", 
                  },
                }}
              />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12}>
            <InputLabel
              sx={{
                fontWeight: "bold",
              }}
            >
              E-posta Adresiniz
            </InputLabel>
            <TextField
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              error={!!formik.errors.email && formik.touched.email}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  backgroundColor: "#fff", 
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              sx={{
                fontWeight: "bold",
              }}
            >
              Cep Telefonu Numaranız
            </InputLabel>
            <TextField
              fullWidth
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              error={!!formik.errors.phoneNumber && formik.touched.phoneNumber}
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? formik.errors.phoneNumber
                  : ""
              }
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  backgroundColor: "#fff", 
                },
              }}
              onInput={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.checkbox1}
                  onChange={formik.handleChange}
                  name="checkbox1"
                />
              }
              label={
                <Typography variant="body2">
                  <Link onClick={handleOpenModal} sx={{ cursor: "pointer",color: "#273a7e",textDecoration: "none",fontWeight: "bold" }}>
                    KVKK Aydınlatma
                  </Link>{" "}
                  metnini okudum ve onaylıyorum.
                </Typography>
              }
              sx={{ width: "250px" }}
            />
            {formik.errors.checkbox1 && formik.touched.checkbox1 && (
              <Typography variant="body2" color="error">
                {formik.errors.checkbox1}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.checkbox2}
                  onChange={formik.handleChange}
                  name="checkbox2"
                />
              }
              label={
                <Typography variant="body2">
                  <Link onClick={handleOpenModal1} sx={{ cursor: "pointer",color: "#273a7e",textDecoration: "none",fontWeight: "bold" }}>
                    Kullanıcı Sözleşmesi
                  </Link>{" "}
                  metnini okudum ve onaylıyorum.
                </Typography>
              }
              sx={{ width: "250px" }}
            />
            {formik.errors.checkbox2 && formik.touched.checkbox2 && (
              <Typography variant="body2" color="error">
                {formik.errors.checkbox2}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.checkbox3}
                  onChange={formik.handleChange}
                  name="checkbox3"
                />
              }
              label={
                <Typography variant="body2">
                  <Link onClick={handleOpenModal2} sx={{ cursor: "pointer",color: "#273a7e",textDecoration: "none",fontWeight: "bold" }}>
                    İletişim İzni
                  </Link>{" "}
                  Metnini okudum ve onaylıyorum.
                </Typography>
              }
              sx={{ width: "250px" }}
            />
            {formik.errors.checkbox3 && formik.touched.checkbox3 && (
              <Typography variant="body2" color="error">
                {formik.errors.checkbox3}
              </Typography>
            )}
          </Grid>
        </Grid>
      )}

      {selectedValue === "baskasi" && (
        <>
          <Grid container spacing={1} direction="column" sx={{ px: 6 }}>
            <Grid item xs={12}>
              <InputLabel
                sx={{
                  fontWeight: "bold",
                }}
              >
                Sigortalı T.C. Kimlik Numaranız (11 Hane)
              </InputLabel>
              <TextField
                fullWidth
                name="tck_sigortali"
                value={formik.values.tck_sigortali}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                error={
                  !!formik.errors.tck_sigortali && formik.touched.tck_sigortali
                }
                size="small"
                helperText={
                  formik.touched.tck_sigortali && formik.errors.tck_sigortali
                    ? formik.errors.tck_sigortali
                    : ""
                }
                sx={{
                  "& .MuiInputBase-input": {
                    backgroundColor: "#fff", 
                  },
                }}
                onInput={handleInput}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6} md={4}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Sigortalı Doğum Tarihi
                </InputLabel>
                <DatePicker
                  fullWidth
                  name="birthday_sigortali"
                  value={formik.values.birthday_sigortali}
                  onChange={(date) =>
                    formik.setFieldValue("birthday_sigortali", date)
                  }
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth variant="outlined" />
                  )}
                  size="small"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      backgroundColor: "#fff", 
                    },
                  }}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12}>
              <InputLabel
                sx={{
                  fontWeight: "bold",
                }}
              >
                Sigortalı E-posta
              </InputLabel>
              <TextField
                fullWidth
                name="email_sigortali"
                value={formik.values.email_sigortali}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                error={
                  !!formik.errors.email_sigortali &&
                  formik.touched.email_sigortali
                }
                helperText={
                  formik.touched.email_sigortali &&
                  formik.errors.email_sigortali
                    ? formik.errors.email_sigortali
                    : ""
                }
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    backgroundColor: "#fff", 
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                sx={{
                  fontWeight: "bold",
                }}
              >
                Sigortalı Cep Telefonu
              </InputLabel>
              <TextField
                fullWidth
                name="phoneNumber_sigortali"
                value={formik.values.phoneNumber_sigortali}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                error={
                  !!formik.errors.phoneNumber_sigortali &&
                  formik.touched.phoneNumber_sigortali
                }
                helperText={
                  formik.touched.phoneNumber_sigortali &&
                  formik.errors.phoneNumber_sigortali
                    ? formik.errors.phoneNumber_sigortali
                    : ""
                }
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    backgroundColor: "#fff",
                  },
                }}
                onInput={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.checkbox1}
                    onChange={formik.handleChange}
                    name="checkbox1"
                  />
                }
                label={
                  <Typography variant="body2">
                    <Link onClick={handleOpenModal} sx={{ cursor: "pointer",color: "#273a7e",textDecoration: "none",fontWeight: "bold" }}>
                      KVKK Aydınlatma
                    </Link>{" "}
                    metnini okudum ve onaylıyorum.
                  </Typography>
                }
                sx={{ width: "250px" }}
              />
              {formik.errors.checkbox1 && formik.touched.checkbox1 && (
                <Typography variant="body2" color="error">
                  {formik.errors.checkbox1}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.checkbox2}
                    onChange={formik.handleChange}
                    name="checkbox2"
                  />
                }
                label={
                  <Typography variant="body2">
                    <Link onClick={handleOpenModal} sx={{ cursor: "pointer" ,color: "#273a7e",textDecoration: "none",fontWeight: "bold" }}>
                      Kullanıcı Sözleşmesi
                    </Link>{" "}
                    metnini okudum ve onaylıyorum.
                  </Typography>
                }
                sx={{ width: "250px" }}
              />
              {formik.errors.checkbox2 && formik.touched.checkbox2 && (
                <Typography variant="body2" color="error">
                  {formik.errors.checkbox2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.checkbox3}
                    onChange={formik.handleChange}
                    name="checkbox3"
                  />
                }
                label={
                  <Typography variant="body2">
                    <Link onClick={handleOpenModal} sx={{ cursor: "pointer" ,color: "#273a7e",textDecoration: "none",fontWeight: "bold"}}>
                      İletişim İzni
                    </Link>{" "}
                    Metnini okudum ve onaylıyorum.
                  </Typography>
                }
                sx={{ width: "250px" }}
              />
              {formik.errors.checkbox3 && formik.touched.checkbox3 && (
                <Typography variant="body2" color="error">
                  {formik.errors.checkbox3}
                </Typography>
              )}
            </Grid>
          </Grid>
        </>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          width: "100%",
          maxWidth: "300px",
          backgroundColor: "#273a7e",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#273a7e",
          },
        }}
      >
        Devam
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              maxHeight: "80vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              overflow: "auto",
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Eureko Sigorta KVKK Aydınlatma Metni
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ fontSize: "0.875rem" }}>
                <h4>
                  İNTERNET SİTESİ KULLANIMI İÇİN KİŞİSEL VERİLERİN İŞLENMESİ
                  HAKKINDA AYDINLATMA METNİ
                </h4>
                İşbu KVK Aydınlatma Metni ( "Aydınlatma Metni"), Eureko Sigorta
                A.Ş. ( "Şirketimiz"; "Eureko") olarak, resmi internet sitemiz
                olan https://www.eurekosigorta.com.tr adresini ( "Site") ve/veya
                Eureko Sigorta Mobil uygulamasını (“Mobil Uygulama”) ziyaret
                ettiğinizde, sigorta poliçesine yönelik başvuru ve teklif talebi
                işlemlerinizde geçerli olmak üzere ve veri sorumlusu sıfatıyla
                KVK mevzuatından kaynaklanan aydınlatma yükümlülüğümüzün yerine
                getirilmesi amacıyla hazırlanmıştır. Eureko olarak, kişisel
                verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu (
                "KVKK") ve ikincil düzenlemelerine (birlikte "KVK mevzuatı")
                uygun olarak işlenmesi ve korunması için azami hassasiyeti
                göstermekteyiz. 1. İşlenen Kişisel Verileriniz, İşlenme Amaçları
                ve Hukuki Sebebi: Kişisel Verileriniz (kimlik, iletişim, işlem
                güvenliği, müşteri işlem, poliçe ve varsa poliçede mevcut acente
                bilgileri) www.eurekosigorta.com.tr adresimizden yapacağınız
                poliçeye yönelik başvuru ve teklif taleplerinizde aşağıdaki amaç
                ve şartlar doğrultusunda işlenebilecektir. - Sigorta sözleşmesi
                tanzim etmek üzere risk değerlendirmesi yapılabilmesi,
                tazminatlarının hesaplanması ve ödenmesi süreçlerinin
                yürütülmesi, poliçe prim ve teminatlarının belirlenebilmesi,
                sigorta teklifi oluşturulması amacıyla işlenen kişisel veriler,
                Kanun’un 5’inci maddesinin 2’nci fıkrasının (c) bendi uyarınca
                sigorta sözleşmesinin kurulması ve ifasıyla doğrudan doğruya
                ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel
                verilerin işlenmesinin gerekli olması şartına dayalı olarak;
                -5651 Sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi
                Ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi
                Hakkında Kanun Ve İkincil Düzenlemelerinden Doğan
                Yükümlülüklerimizi Yerine Getirilmesi amacı ile, 5’inci
                maddesinin 2’nci fıkrasının (ç) bendi uyarınca veri sorumlusunun
                hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması
                şartına dayalı olarak, - Kanunlar ve ilgili mevzuatlardan
                kaynaklanan bilgi/belge saklama yükümlülüklerinin ifası ve
                işlemlerin kayıt altına alınması amacıyla işlenen kişisel
                veriler, Kanun’un 5’inci maddesinin 2’nci fıkrasının (ç) bendi
                uyarınca veri sorumlusunun hukuki yükümlülüğünü yerine
                getirebilmesi için veri işlemenin zorunlu olması şartına dayalı
                olarak; - Müşteri ile acente etkileşimlerinin sağlanabilmesi ve
                veri analizi çalışmaları amacıyla işlenen kişisel veriler,
                Kanun’un 5’inci maddesinin 2’nci fıkrasının (f) bendi uyarınca;
                ilgili kişinin temel hak ve özgürlüklerine zarar vermemek
                kaydıyla, veri sorumlusunun meşru menfaatleri için veri
                işlenmesinin zorunlu olması şartına dayalı olarak;
                işlenebilecektir. - Ürün Ve Hizmetlerimize İlişkin Talep,
                Şikâyet, Soru Ve Önerilerinizi Değerlendirerek Sizlere Geri
                Dönüş/Destek Sağlanması amacı ile işlenen kişisel veriler,
                Kanun’un 5’inci maddesinin 2’nci fıkrasının (e) bendi uyarınca
                bir hakkın tesisi, kullanılması veya korunması için veri
                işlemenin zorunlu olması şartına dayalı olarak;
                işlenebilecektir. Eureko tarafından sunulan hizmetlere yönelik
                işlenen kişisel verilere ilişkin detaylı tablo aydınlatma
                metnine buradan ulaşabilirsiniz. 2. Kişisel Verilerinizin
                Toplanma Yöntemi Kişisel verileriniz; Eureko Sigorta internet
                sitesinin kullanımı sırasında gerçekleştirdiğiniz işlemlerden,
                ürün/teklif işlemleri, çevrimiçi işlemler, hasar bildirimi, bize
                ulaşın alanlarında ilettiğiniz bilgiler vasıtasıyla elektronik
                ortamda, tamamen veya kısmen otomatik olan ya da herhangi bir
                veri kayıt sisteminin parçası olarak otomatik olmayan yollarla
                temin edilerek, işlenmekte ve güncellenmektedir. 3. Kişisel
                Verilerinizin Aktarıldığı Taraflar ve Aktarım Amaçları Eureko
                tarafından, kişisel verilerinizi işleme amaçlarıyla bağlantılı,
                sınırlı ve ölçülü olmak kaydıyla ve ilk maddede anılan hukuki
                sebeplere dayalı olarak yurt içi tedarikçiler (aktüerler,
                eksperler, asistans hizmet şirketleri, bilgi teknoloji hizmet
                sağlayıcıları, arşiv hizmeti firmaları, danışmanlar vb), iş
                ortakları (reasürörler, acente vb), yetkili kurum kuruluşlar
                (Hazine ve Maliye Bakanlığı, Sigorta Bilgi ve Gözetim Merkezi
                (SBM), Bilgi Teknolojileri Kurumu (BTK) vb.) ve diğer 3.
                kişilere (diğer sigorta şirketleri, sigorta ettiren kişi/kurum
                vb) mevzuatın izin verdiği ve gerektiği ölçü ve koşullarda
                aktarılmaktadır. 4. Bilgi Edinme Hakkınız KVK Kanunu’nun 11.
                maddesi kapsamında, Şirketimize başvurarak kişisel
                verilerinizin; (i) işlenip işlenmediğini öğrenme; (ii)
                işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve
                amacına uygun kullanılıp kullanılmadığını öğrenme, (iii) yurt
                içinde / yurt dışında aktarıldığı 3. kişileri bilme, eksik /
                yanlış işlenmişse düzeltilmesini isteme; (iv) KVK Kanunu’nun 7.
                maddesinde öngörülen şartlar çerçevesinde silinmesini / yok
                edilmesini isteme; (v) kişisel verilerinizin KVK Kanunu’nun 7.
                maddesi kapsamında silinmesi ve yok edilmesi ve eksik / yanlış
                işlenmiş kişisel verilerinin düzeltilmesi taleplerinin, kişisel
                verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme;
                (vi) münhasıran otomatik sistemler ile analiz edilmesi nedeniyle
                aleyhinize bir sonucun ortaya çıkmasına itiraz etme, (vii)
                kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız
                hâlinde zararın giderilmesini talep etme haklarına sahip
                olduğunuzu bildiririz. Yukarıda belirtilen haklarınızdan
                yararlanmak için başvurularınızı Altunizade Mahallesi Ord. Prof.
                Fahrettin Kerim Gökay Cad. No:20 34662 Üsküdar / İstanbul
                adresinden, kayıtlı elektronik posta (KEP) adresimiz
                eurekosigorta@hs03.kep.tr veya
                https://www.eurekosigorta.com.tr/iletisim/bize-yazin üzerinden
                yazılı olarak veya +90 (216) 400 10 00 numaralı telefondan
                Eureko’ya iletebilirsiniz.
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleCloseModal}
                variant="contained"
                sx={{
                  backgroundColor: "#273a7e",
                  color: "#fff",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#273a7e",
                  },
                }}
              >
                Tamam
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openModal1}
        onClose={handleCloseModal1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal1}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 200,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Kullanıcı Sözleşmesi
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Eureko Sigorta’nın şimdi ilettiğim ve/veya gelecekte ileteceğim
              kimlik ve iletişim bilgilerimi reklam, kampanya ve benzeri
              pazarlama faaliyetlerin yürütülmesi amacıyla elektronik ortamlarda
              otomatik olarak işlemesini ve 6563 sayılı Elektronik Ticaretin
              Düzenlenmesi Hakkında Kanun’a uygun olarak tarafıma ticari
              elektronik ileti göndermesini kabul ediyorum.
            </Typography>
            <Box
              sx={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleCloseModal1}
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#273a7e",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#273a7e",
                  },
                }}
              >
                Tamam
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openModal2}
        onClose={handleCloseModal2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal2}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 200,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Eureko Sigorta İletişim İzin Metni
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Eureko Sigorta’nın şimdi ilettiğim ve/veya gelecekte ileteceğim
              kimlik ve iletişim bilgilerimi reklam, kampanya ve benzeri
              pazarlama faaliyetlerin yürütülmesi amacıyla elektronik ortamlarda
              otomatik olarak işlemesini ve 6563 sayılı Elektronik Ticaretin
              Düzenlenmesi Hakkında Kanun’a uygun olarak tarafıma ticari
              elektronik ileti göndermesini kabul ediyorum.
            </Typography>
            <Box
              sx={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleCloseModal2}
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#273a7e",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#273a7e",
                  },
                }}
              >
                Tamam
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
