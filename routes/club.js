const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");
const clubStats = require("../models/clubStats");

//Get all clubs
router.get("/", clubController.getAllClubs);

//Get club by id
router.get("/:id", clubController.getClubById);

//Get club by title
router.get("/title/:title", clubController.getClubByTitle);

//Search club by title
router.get("/search/:title", clubController.searchClubByTitle);

//Get clubs where a user is owner of
router.get("/owner/:id", clubController.getClubsUserIsOwner);

//Get clubs where a user is a member of
router.get("/member/:id", clubController.getClubsUserIsMember);

//Get clubs members
router.get("/clubmembers/:id", clubController.getClubMembers);

//Get clubs user follows
router.get("/clubfollowers/:id", clubController.getClubsUserFollows);

//Save club
router.post("/:uid", clubController.saveClub);

//Update club
router.patch("/:id", clubController.updateClub);

//invite user to club
router.patch("/inviteuser/:id", clubController.inviteUserToClub);

//accept club invite
router.patch("/acceptinvite/:clubid", clubController.acceptClubInvite);

//join club
router.patch("/joinclub/:clubid", clubController.joinClub);

//Follow club
router.patch("/followclub/:clubid", clubController.followClub);

//UnFollow club
router.patch("/unfollowclub/:clubid", clubController.unFollowClub);

//Leave club
router.patch("/leaveclub/:clubid", clubController.leaveClub);

//Add topic
router.patch("/topics/add/:clubid", clubController.addTopic);

//Remove topic
router.patch("/topics/remove/:clubid", clubController.removeTopic);

//Add Room belonging club
router.patch("/rooms/add/:clubid", clubController.addRoom);

//Remove Room belonging club
router.patch("/rooms/remove/:clubid", clubController.removeRoom);

//Delete club
router.delete("/:id", clubController.deleteClub);

//post club analytcis

router.post("/analytics", async (req, res) => {
  req.body.clubid = req.body.uid;
  await clubModel.find({ clubid: req.body.clubid }).then(async (club) => {
    console.log(club);
    if (club.length == 0) {
      const clubaction = new clubModel(req.body);
      const results = await clubaction.save();
      console.log("add new", results);
    }
  });
  const clubStatsaction = new clubStats({
    clubid: req.body.clubid,
    action: req.body.action,
    number: req.body.number,
    type: req.body.type,
  });
  var results = await clubStatsaction.save();

  res.status(200).json(results);
});

//get club analytics
//type: dynamic
//clubid : id of the club

router.get("/analytics/:type/:clubid", async (req, res) => {
  try {
    console.log(req.params);
    const type = req.params.type;
    const clubid = req.params.clubid;
    console.log({ type, clubid });
    const results = await clubStats.find({ type, clubid });
    res.send(results);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
