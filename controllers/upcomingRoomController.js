const UpcomingRooms = require("../models/upcomingRoomModel");


//Get all rooms
exports.getAllUpcomingRoom = async function (req, res) {
  try {
    const rooms = await UpcomingRooms.find({ eventtimetimestamp: { $gte: Date.now() } }).sort({ eventtimetimestamp: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(404).send(error);
  }
}

//Get all rooms
exports.getAllUpcomingRoomWithLimit = async function (req, res) {
  try {
    const rooms = await UpcomingRooms.find({ eventtimetimestamp: { $gte: Date.now() } }).limit(Number(req.params.limit)).sort({ eventtimetimestamp: 1 });

    res.json(rooms);
  } catch (error) {
    res.status(404).send(error);
  }
}

//get room
exports.getUpcomingRoomById = async function (req, res) {
  try {
    const roomresults = await UpcomingRooms.findOne({ roomid: req.params.id });
    res.json(roomresults);
  } catch (err) {
    res.status(404).send(err);
  }
}

//get user upcoming events
exports.getUserUpcomingRooms = async function (req, res) {
  try {
    const roomresults = await UpcomingRooms.find({
      $and: [
        { userid: req.params.id },
        { eventtime: { $gte: Date.now() } },
      ],
    }).sort({ eventtimetimestamp: 1 });

    res.json(roomresults);
    console.log(Date.now() * 1000);
  } catch (err) {
    res.status(404).send(err);
  }
}

//get user upcoming events with limit
exports.getUserUpcomingRoomsWithLimit = async function (req, res) {
  try {
    const roomresults = await UpcomingRooms.find({
      $and: [
        { userid: req.params.id },
        { eventtime: { $gte: Date.now() } },
      ],
    })
      .limit(Number(req.params.limit))
      .sort({ eventtimetimestamp: 1 });

    res.json(roomresults);
    console.log(Date.now() * 1000);
  } catch (err) {
    res.status(404).send(err);
  }
}

//get club upcoming events
exports.getClubUpcomingRoom = async function (req, res) {
  try {
    const roomresults = await UpcomingRooms.find({
      $and: [
        { clubid: req.params.id },
        { eventtime: { $gte: Date.now() } },
      ],
    }).sort({ eventtimetimestamp: 1 });
    res.json(roomresults);
  } catch (err) {
    res.status(404).send(err);
  }
}

//get club upcoming events
exports.getClubUpcomingRoomWithLimit = async function (req, res) {
  try {
    const roomresults = await UpcomingRooms.find({
      $and: [
        { clubid: req.params.id },
        { eventtime: { $gte: Date.now() } },
      ],
    })
      .limit(req.params.limit).sort({ eventtimetimestamp: 1 });
    res.json(roomresults);
  } catch (err) {
    res.status(404).send(err);
  }
}

//create room
exports.createUpcomingRoom = async function (req, res) {
  const room = new UpcomingRooms(req.body);
  try {
    var results = await room.save();
    res.json(results._id.valueOf());
  } catch (err) {
    res.status(404).json(err);
  }
}

//update room
exports.updateUpcomingRoom = async function (req, res) {
  try {
    await UpcomingRooms.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json("Updated successfully");
  } catch (err) {
    res.status(404).json(err);
  }
}

//Add to be notified users
exports.addToNotifiedUsers = async function (req, res) {
  try {
    await UpcomingRooms.updateOne(
      { roomid: req.params.id },
      { $push: { tobenotifiedusers: [req.body.uid] } });

    res.json("Updated successfully");
  } catch (err) {
    res.status(404).json(err);
  }
}

//Remove from be notified users
exports.removFromNotifiedUsers = async function (req, res) {
  try {
    await UpcomingRooms.updateOne(
      { roomid: req.params.id },
      { $pullAll: { tobenotifiedusers: [req.body.uid] } });

    res.json("Updated successfully");
  } catch (err) {
    res.status(404).json(err);
  }
}

//delete room
exports.deleteUpcomingRoom = async function (req, res) {
  try {
    await UpcomingRooms.deleteOne({ _id: req.params.id });
    res.json("Deleted successfuly");
  } catch (err) {
    res.status(404).send(err);
  }
}