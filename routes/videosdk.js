const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// var request = require("node-fetch");

//GENERATE TOKEN
router.get("/get-token", (req, res) => {
  const API_KEY = "b78663bf-42bd-44f4-b26d-4d56ad67939d";
  const SECRET_KEY =
    "ad518aaac5f309b4aa63dcf6650142431f34c95f5c35e7a48dee9bb8c3e41737";
  const options = { expiresIn: "10m", algorithm: "HS256" };
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_mod"], // Trigger permission.
  };
  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

//CREATE A MEETING

// router.get("/create-meeting", (req, res) => {
//   var options = {
//     method: "POST",
//     url: "https://api.videosdk.live/v1/meetings",
//     headers: { authorization: `${req.token}` },
//   };

//   request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
//   });
// });

module.exports = router;
