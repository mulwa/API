const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/login/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const users = await userModel.findOne({ email: email });
    res.send(users);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/login/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const users = await userModel.findOne({ email: email });

    const msg = {
      to: email,
      // Change to your recipient
      from: "roomies254@gmail.com",
      // Change to your verified sender
      subject: "Verify Gistlytics Access Link",
      html:
        "<strong>For you to access Gistlytics, click this <a href='http://localhost:3000/account/" +
        users._id +
        "'>link</></strong>",
    };

    // console.log(users);
    //send email
    sendgrid
      .send(msg)
      .then((resp) => {
        // console.log("Email sent\n", resp);
        res.status(200).json({ status: "success" });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
