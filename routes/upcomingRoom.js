var router = require("express").Router();
const upcomingRoomController = require('../controllers/upcomingRoomController')

//Get all rooms
router.get("/", upcomingRoomController.getAllUpcomingRoom);

//Get all rooms with limit
router.get("/allwithlimit/:limit", upcomingRoomController.getAllUpcomingRoomWithLimit);

//get room
router.get("/:id", upcomingRoomController.getUpcomingRoomById);

//get user upcoming events
router.get("/userevents/:id", upcomingRoomController.getUserUpcomingRooms);

//get user upcoming events with limit
router.get("/userevents/limit/:id/:limit", upcomingRoomController.getUserUpcomingRoomsWithLimit);

//get club upcoming events
router.get("/clubevents/:id", upcomingRoomController.getClubUpcomingRoom);

//get club upcoming events with limit
router.get("/clubevents/limit/:id/:limit", upcomingRoomController.getClubUpcomingRoomWithLimit);

//create room
router.post("/", upcomingRoomController.createUpcomingRoom);

//update room
router.patch("/:id", upcomingRoomController.updateUpcomingRoom);

//Add user to be notified
router.patch("/tobenotified/add/:id", upcomingRoomController.addToNotifiedUsers);

//Remove user to be notified
router.patch("/tobenotified/remove/:id", upcomingRoomController.removFromNotifiedUsers);

//delete room
router.delete("/:id", upcomingRoomController.deleteUpcomingRoom);

module.exports = router;
