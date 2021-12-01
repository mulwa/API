const Room = require("../models/endedRoomModel");

//Get all rooms
exports.getAllEndedRooms = async function (req, res) {
    try {
        const rooms = await Room.find()
        res.json(rooms)

    } catch (error) {
        res.json({ message: error })
    }
}

//get room
exports.getEndedRoomById = async function (req, res) {
    try {
        const roomresults = await Room.findById(req.params.id);
        res.json(roomresults);
    } catch (err) {
        res.status(404).json(err);
    }
}

//Get all rooms by owner
exports.getEndedRoomByOwner = async function (req, res) {
    try {
        const rooms = await Room.find({ ownerid: req.params.ownerid });
        res.json(rooms);
      } catch (error) {
        res.json({ message: error });
      }
}

//Get all rooms by clubs
exports.getEndedRoomByClub = async function (req, res) {
    try {
        const rooms = await Room.find({
          clubListIds: { $elemMatch: { $eq: req.params.clubid } },
        });
        res.json(rooms);
      } catch (error) {
        res.json({ message: error });
      }
}

//create room
exports.createEndedRoom = async function (req, res) {
    const room = new Room(req.body);
    try {
        await room.save();
        res.json("Room saved successfully");
    } catch (err) {
        res.status(404).send(err);
    }
}

//update room
exports.updateEndedRoom = async function (req, res) {
    try {
        await Room.updateOne({ _id: req.params.id }, { $set: req.body });
        res.json("Room updated successfully");
    } catch (err) {
        res.status(404).json(err);
    }
}

//delete room
exports.deleteEndedRoom = async function (req, res) {
    try {
        await Room.deleteOne({ _id: req.params.id });
        res.json("Room deleted successfully");
    } catch (err) {
        res.status(404).json(err);
    }
}

exports.endedRoom = async function (req, res) { }