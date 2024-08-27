import * as yup from 'yup';

const tcKimlikNoRegex = /^[1-9]\d{9}[02468]$/;
export const genericTckScheme = yup.string()
  .matches(tcKimlikNoRegex, 'T.C. Kimlik Numarası 11 haneli olmalı ve sadece rakamlardan oluşmalı, 0 ile başlamamalı')
  .required('T.C. Kimlik Numarası zorunludur');

export const genericEmail = yup.string().email('Geçerli bir email giriniz').required('Email girmek zorunludur');

export const genericBirthday = yup.date().required('Doğum tarihi zorunludur');


export const genericPhoneNumber = yup.string().matches(/^\d+$/, 'Cep Telefonu Numarası sadece rakamlardan oluşmalı').required('Cep Telefonu Numarası zorunludur');


const checkboxValidation = yup.boolean().oneOf([true], 'Bu alanı onaylamanız gerekmektedir');


const cardNumberValidation = yup.string().matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,  'Kredi kartı numarası 16 haneli olmalı').required('Kredi kartı numarası gereklidir');
const expiryDateValidation = yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Geçerli bir son kullanma tarihi giriniz (MM/YY)').required('Son kullanma tarihi gereklidir');
const cardNameValidation = yup.string().matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Kart sahibi adı sadece harf ve boşluk içerebilir').required('Kart sahibi adı gereklidir');
const cvcValidation= yup.string().matches(/^[0-9]{3,4}$/, 'CVC kodu geçerli değil. 3 veya 4 basamaklı olmalıdır.').required('CVC kodu zorunludur.');

export const kendimSchema = yup.object().shape({
  tck: genericTckScheme,
  birthday: genericBirthday,
  email: genericEmail,
  phoneNumber: genericPhoneNumber,
  checkbox1: checkboxValidation,
  checkbox2: checkboxValidation,
  checkbox3: checkboxValidation,
});


export const baskasiSchema = yup.object().shape({
  tck_sigortali: genericTckScheme,
  birthday_sigortali: genericBirthday,
  email_sigortali: genericEmail,
  phoneNumber_sigortali: genericPhoneNumber,
  checkbox1: checkboxValidation,
  checkbox2: checkboxValidation,
  checkbox3: checkboxValidation,
});

export const basicSchema = yup.object().shape({
  cardName: cardNameValidation,
  cardNumber: cardNumberValidation,
  expiryDate: expiryDateValidation,
  policyInfo: checkboxValidation,
  cvc:cvcValidation,
  agreement:checkboxValidation,
});

