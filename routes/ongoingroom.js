var router = require("express").Router();
const ongoingRoomController = require('../controllers/ongoingRoomController')

//create room
router.post('/', ongoingRoomController.saveRoom)

//Get all rooms
router.get('/', ongoingRoomController.getAllRooms)

//Get room by id
router.get('/:id', ongoingRoomController.getRoomById)

//Get private rooms
router.get('/privaterooms', ongoingRoomController.getPrivateRooms)

//Get public rooms
router.get('/publicrooms', ongoingRoomController.getPublicRooms)

//Get social rooms
router.get('/socialrooms', ongoingRoomController.getSocialRooms)

//Get club rooms
router.get('/clubrooms/open', ongoingRoomController.getOpenClubRooms)

//Get club rooms
router.get('/clubrooms/closed/:uid', ongoingRoomController.getClosedClubRooms)

//Get raised hands
router.get('/raisedHands/get/:id', ongoingRoomController.getRaisedHands)

//Get room users
router.get('/allusers/:id', ongoingRoomController.getRoomUsers)

//Get room users by id
router.get('/user/:id', ongoingRoomController.getRoomUserById)

//Update room
router.patch('/:id', ongoingRoomController.updateRoom)

//Add to raised hands
router.patch('/raisedhands/add/:id', ongoingRoomController.addToRaisedHands)

//Remove to raised hands
router.patch('/raisedhands/remove/:id', ongoingRoomController.removeFromRaisedHands)

//Add user to collection
router.patch('/adduser/:id', ongoingRoomController.addToUserCollection)

//Add user to collection
router.patch('/updateuser/user/:id/:uid', ongoingRoomController.updateUserInCollection)

//Remove user from collection
router.patch('/removeuser/:id', ongoingRoomController.removeUserFromCollection)

//Remove all users from collection
router.patch('/removeallusers/:id', ongoingRoomController.removeAllUsersFromCollection)

//Add user to removed users
router.patch('/addtoremovedusers/:id', ongoingRoomController.addToRemovedUsersInRoom)

//Add to active moderators
router.patch('/activemoderators/add/:id', ongoingRoomController.addToActiveModeratorsInRoom)

//Remove from active moderators
router.patch('/activemoderators/remove/:id', ongoingRoomController.removeFromActiveModeratorsInRoom)

//Add to all moderators
router.patch('/moderators/add/:id', ongoingRoomController.addToAllModeratorsInRoom)

//Remove from all moderators
router.patch('/moderators/remove/:id', ongoingRoomController.removeFromAllModeratorsInRoom)

//Add to invited moderators
router.patch('/invitedmoderators/add/:id', ongoingRoomController.addToInvitedModeratorsInRoom)

//Remove from invited moderators
router.patch('/invitedmoderators/remove/:id', ongoingRoomController.removeFromInvitedModeratorsInRoom)

//Add to invited users
router.patch('/invitedusers/add/:id', ongoingRoomController.addToInvitedUsersInRoom)

//Remove from invited users
router.patch('/invitedusers/remove/:id', ongoingRoomController.removeFromInvitedUsersInRoom)

//Add to invited users
router.patch('/speakers/add/:id', ongoingRoomController.addToSpeakersInRoom)

//Remove from invited users
router.patch('/speakers/remove/:id', ongoingRoomController.removeFromSpeakersInRoom)

//Add to club members
router.patch('/clubmembers/add/:id', ongoingRoomController.addToClubMembersInRoom)

//Delete room
router.delete('/:id', ongoingRoomController.deleteRoom)

module.exports = router;
