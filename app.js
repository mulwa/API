const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

//import routes
const userRoute = require("./routes/user");
const activityRoute = require("./routes/activity");
const transactionRoute = require("./routes/transaction");
const upcomingRoomRoute = require("./routes/upcomingRoom");
const endedRoomRoute = require("./routes/endedroom");
const ongoingRoomRoute = require("./routes/ongoingroom");
const clubRoute = require("./routes/club");
const gistlyticsRoute = require("./routes/gistlytics");
const vsdkRoute = require("./routes/videosdk");
const uploadImages = require("./routes/uploadImages")

app.listen(port);

//middlewares
app.use(express.json());
app.use(cors());

// const auth = require("./middleware/auth");
// app.use(auth);

//Routes
app.use("/users", userRoute);
app.use("/activities", activityRoute);
app.use("/transactions", transactionRoute);
app.use("/endedrooms", endedRoomRoute);
app.use("/ongoingrooms", ongoingRoomRoute);
app.use("/upcomingroom", upcomingRoomRoute);
app.use("/clubs", clubRoute);
app.use("/vsdk", vsdkRoute);
app.use("/gistlytics", gistlyticsRoute);
app.use("/uploadimages", uploadImages)

//Connect to db
mongoose.connect(
  "mongodb+srv://gist-house-user:qPXzKQkSOqdL7AP3@cluster0.trtul.mongodb.net/gistHouseDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("Database connected")
);
