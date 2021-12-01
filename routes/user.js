const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Get all users
router.get("/", userController.getAllUsers);

//Get user by id
router.get("/:id", userController.getUserById);

//Get user by firstname
router.get("/firstname/:firstname", userController.getUserByFirstName);

//search user by firstname
router.get("/search/:firstname", userController.searchUserByFirstName);

//Get user by username
router.get("/username/:username", userController.getUserByUserName);

//Get users by country code
router.get("/country/:code", userController.getUserByCountry);

//Get users with phone
router.get("/phonenumber/:number", userController.getUserByPhone);

//Get my followers
router.get("/followers/:id", userController.getUserFollowers);

//Get users i follow
router.get("/following/:id", userController.getUserFollowing);

//Get users we follow each other
router.get("/mutualfollow/:id", userController.getUserMutualFollowers);

router.post("/:id", userController.saveUser);

//followUser
router.patch("/follow/:tofollowid", userController.followUser);

//UnfollowUser
router.patch("/unfollow/:tofollowid", userController.unFollowUser);

//Add interest
router.patch("/interests/add/:id", userController.addInterest);

//Remove interest
router.patch("/interests/remove/:id", userController.removeInterest);

//Block user
router.patch("/block/add/:id", userController.blockUser);

//UnBlock user
router.patch("/block/remove/:id", userController.unBlockUser);

//Update user
router.patch("/:id", userController.UpdateUser);

//Delete user
router.delete("/:id", userController.DeleteUser);

//user stats
router.get("/statistics/:type/:userid", userController.GetUserStats);

router.post("/statistics", userController.SaveUserStats);

module.exports = router;
