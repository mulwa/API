var router = require("express").Router();
const endedRoomsController = require("../controllers/endedRoomController")

//Get all rooms
router.get('/', endedRoomsController.getAllEndedRooms)

//Get all rooms by owner
router.get("/owner/:ownerid", endedRoomsController.getEndedRoomByOwner);

//Get all rooms by clubs
router.get("/club/:clubid", endedRoomsController.getEndedRoomByClub);

//get room
router.get("/:id", endedRoomsController.getEndedRoomById);

//create room
router.post("/", endedRoomsController.createEndedRoom);

//update room
router.patch("/:id", endedRoomsController.updateEndedRoom);

module.exports = router;
