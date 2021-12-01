const userModel = require("../models/userModel");
const clubModel = require("../models/clubModel");
const userStats = require("../models/userStats");
const utils = require("../utils");

//Get all users
exports.getAllUsers = async function (req, res) {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get user by Id
exports.getUserById = async function (req, res) {
  try {
    const users = await userModel.findOne({uid: req.params.id});
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get user by firstname
exports.getUserByFirstName = async function (req, res) {
  try {
    const firstname = req.params.firstname;
    const users = await userModel.findOne({
      $or: [{ firstname: { $ne: firstname } }],
    });
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get user by username
exports.getUserByUserName = async function (req, res) {
  try {
    const username = req.params.username;
    const users = await userModel.findOne({
      $or: [{ username: { $eq: username } }],
    });
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get users by country code
exports.getUserByCountry = async function (req, res) {
  try {
    const code = req.params.code;
    const users = await userModel.find({ 
      $and: [
        {countrycode: { $eq: code }},
        {uid: {$eq: req.body.myid}}
      ]
     });
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get users with phone
exports.getUserByPhone = async function (req, res) {
  try {
    const users = await userModel.find({
      phonenumber: { $eq: req.params.number },
    });
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//search user by firstname
exports.searchUserByFirstName = async function (req, res) {
  try {
    const users = await userModel.find({
      firstname: { $regex: req.params.firstname, $options: "i" },
    });
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get my followers
exports.getUserFollowers = async function (req, res) {
  try {
    const users = await userModel.find({ following: req.params.id });
    res.json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Get users i follow
exports.getUserFollowing = async function (req, res) {
  try {
    const users = await userModel.find({ followers: req.params.id });
    res.json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Get users we follow each other
exports.getUserMutualFollowers = async function (req, res) {
  try {
    const myFollowers = await userModel.find({
      followers: req.params.id,
      following: req.params.id,
    });

    console.log("fffffffffff");
    res.json(myFollowers);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Save user
exports.saveUser = async function (req, res) {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.json("Successfuly saved user");
    await userModel.updateOne({ _id: user._id }, { $inc: { gcbalance: 500 } });

    try {
      //Send notification to new user
      utils.sendNotification(
        req.body["firebasetoken"],
        "Welcome to GistHouse",
        "Congratulations! You've earned 500 Gist",
        "HomePage",
        req.body["uid"]
      );
    } catch (error) {
      console.log(error);
    }

    //Send notification to referrer if they exist
    if (req.body["referrerid"] != "" && req.body["referrerid"] != null) {
      utils.sendToReferrerNotification(
        req.body["referrerid"],
        "You have earned 50 Gist",
        "Congrats! Your Referral Just Signed Up." + "You have earned 50 Gist!",
        "ProfilePage",
        req.body["uid"]
      );

      try {
        await userModel.updateOne(
          { _id: req.body["referrerid"] },
          { $inc: { gcbalance: 50 } }
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      //Update the GistHouse Main Club
      await clubModel.updateOne(
        { _id: "61936250159088b410eddb5c" },
        { $push: { members: [user._id] } }
      );
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

//followUser
exports.followUser = async function (req, res) {
  try {
    const myid = req.body.myid;
    const tofollowid = req.params.tofollowid;
    const myfullname = req.body.myfullname;
    const myimageurl = req.body.myimageurl;

    await userModel.updateOne(
      { _id: myid },
      { $push: { following: [tofollowid] } }
    );

    await userModel.updateOne(
      { _id: tofollowid },
      { $push: { followers: [myid] } }
    );

    try {
      utils.sendNotification(
        req.body.tofollowtoken,
        req.body.myname + " started following you",
        "🙂 👋 New Follower",
        "ProfilePage",
        myid
      );

      utils.saveActivity(
        myid,
        myfullname,
        "user",
        false,
        myimageurl,
        tofollowid,
        " started following you"
      );
    } catch (error) {
      console.log(error);
    }

    res.json("Followed user successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//UnfollowUser
exports.unFollowUser = async function (req, res) {
  try {
    const myid = req.body.myid;
    const tofollowid = req.params.tofollowid;

    await userModel.updateOne(
      { _id: myid },
      { $pullAll: { following: [tofollowid] } }
    );

    await userModel.updateOne(
      { _id: tofollowid },
      { $pullAll: { followers: [myid] } }
    );

    res.json("UnFollowed user successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//Add interest
exports.addInterest = async function (req, res) {
  try {

    await userModel.updateOne(
      { uid: req.params.id },
      { $push: { interests: [req.body] } }
    );

    res.json("Added interest successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//Remove interest
exports.removeInterest = async function (req, res) {
  try {

    await userModel.updateOne(
      { uid: req.params.id },
      { $pullAll: { interests: [req.body] } }
    );

    res.json("Removed interest successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//Block user
exports.blockUser = async function (req, res) {
  try {

    await userModel.updateOne(
      { uid: req.params.id },
      { $push: { blocked: [req.body.uid] } }
    );

    res.json("Blocked user successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//Block user
exports.unBlockUser = async function (req, res) {
  try {

    await userModel.updateOne(
      { uid: req.params.id },
      { $pullAll: { blocked: [req.body.uid] } }
    );

    res.json("Unblocked user successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//Update user
exports.UpdateUser = async function (req, res) {
  try {
    await userModel.updateOne({ _id: req.params.id }, { $set: req.body });

    res.json("Updated user successfully");
  } catch (err) {
    res.status(404).send(err);
  }
};

//Delete user
exports.DeleteUser = async function (req, res) {
  try {
    await userModel.remove({ _id: req.params.id });

    res.json("Successfuly deleted user");
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.SaveUserStats = async function (req, res) {
  await userModel.find({ userid: req.body.userid }).then(async (user) => {
    console.log(user);
    if (user.length == 0) {
      const useraction = new userModel(req.body);
      const results = await useraction.save();
      console.log("add new", results);
    }
  });
  const userStatsaction = new userStats({
    userid: req.body.userid,
    action: req.body.action,
    number: req.body.number,
    type: req.body.type,
  });
  var results = await userStatsaction.save();

  res.status(200).json(results);
};

//get club analytics
//type: dynamic
//clubid : id of the club

exports.GetUserStats = async function (req, res) {
  try {
    console.log(req.params);
    const type = req.params.type;
    const userid = req.params.userid;
    console.log({ type, userid });
    const results = await userStats.find({ type, userid });
    res.send(results);
  } catch (error) {
    res.status(404).send(error);
  }
};
