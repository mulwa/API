"use strict";
const dotenv = require("dotenv");

dotenv.config();

const {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} = process.env;

const FirebaseConfig = {
  apiKey: "AIzaSyBOUbFB0IouC5tfwjcZlOHLpgNUFz3Pu4g",
  authDomain: "gisthouse-887e3.firebaseapp.com",
  projectId: "gisthouse-887e3",
  storageBucket: "gisthouse-887e3.appspot.com",
  messagingSenderId: "949689208847",
  appId: "1:949689208847:web:8948ece24d76c165ba937a",
  measurementId: "G-00TNVEWR95",
};

// const FirebaseConfig = {
//   apiKey: APIKEY,
//   authDomain: AUTHDOMAIN,
//   databaseUrl: DATABASEURL,
//   projectId: PROJECTID,
//   storageBucket: STORAGEBUCKET,
//   messagingSenderId: MESSAGINGSENDERID,
//   appId: "1:949689208847:web:8948ece24d76c165ba937a",
// };

module.exports = {
  firebaseConfig: FirebaseConfig,
};
