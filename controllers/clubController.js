const clubModel = require('../models/clubModel')
const userModel = require('../models/userModel')
const utils = require('../utils')

//Get all clubs
exports.getAllClubs = async function (req, res) {
    try {
        const clubs = await clubModel.find().sort({ title: 0 })
        res.json(clubs)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Get club by id
exports.getClubById = async function (req, res) {
    try {
        const club = await clubModel.findOne({ clubid: req.params.id });
        res.json(club)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Get club by title
exports.getClubByTitle = async function (req, res) {
    try {
        const title = req.params.title
        const club = await clubModel.find({ $or: [{ title: { $eq: title } }] })
        res.json(club)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Search club by title
exports.searchClubByTitle = async function (req, res) {
    try {
        const club = await clubModel.find({ title: { $regex: req.params.title, $options: 'i' } })
        res.json(club)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Get clubs where a user is owner of
exports.getClubsUserIsOwner = async function (req, res) {
    try {
        const id = req.params.id
        const clubs = await clubModel.find({ ownerid: id }).sort({ published_date: 0 })
        res.json(clubs)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Get clubs where a user is a member of
exports.getClubsUserIsMember = async function (req, res) {
    try {
        const id = req.params.id
        const clubs = await clubModel.find({ members: id }).sort({ published_date: 0 })
        res.json(clubs)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Get clubs members
exports.getClubMembers = async function (req, res) {
    try {
        const id = req.params.id

        const user = await userModel.find({ joinedclubs: id }).sort({ membersince: 0 })
        res.json(user)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Get clubs user follows
exports.getClubsUserFollows = async function (req, res) {
    try {
        const id = req.params.uid
        const clubs = await clubModel.find({ followers: id })
        res.json(clubs)

    } catch (error) {
        res.status(404).send(error);
    }
}

//Save club
exports.saveClub = async function (req, res) {
    const club = new clubModel(req.body)

    try {

        var results = await club.save();
        var id = results._id.valueOf()
        console.log(id)
        await clubModel.updateOne({ _id: id },
            { $set: { "clubid": id } })

        res.json(id)
    }

    catch (err) {
        res.status(404).send(err);
    }
}

//Update club
exports.updateClub = async function (req, res) {
    try {
        await clubModel.updateOne({ clubid: req.params.id },
            { $set: req.body })

        res.json("Updated club successfully")
    }

    catch (err) {
        res.status(404).send(err);
    }
}

//invite user to club
exports.inviteUserToClub = async function (req, res) {
    try {

        const userId = req.params.id
        const clubId = req.body.clubid
        const clubName = req.body.clubname
        const userToken = req.body.usertoken
        const inviterName = req.body.invitername
        const inviterImageUrl = req.body.inviterimageurl

        await clubModel.updateOne({ clubid: clubId },
            { $push: { "invited": [userId] } })

        utils.saveActivity(clubId, inviterName, "clubinvite",
            false, inviterImageUrl, req.params.id, "  invited you to join " + clubName + " club")

        utils.sendNotification(userToken, "🙂 👋 New Club Invite",
            inviterName + " invite you to " + clubName + " club", "ViewClub", clubId)

        res.json("Updated club successfully")
    }

    catch (err) {
        res.status(404).send(error);
    }
}

//accept club invite
exports.acceptClubInvite = async function (req, res) {
    try {

        const userId = req.body.uid
        const clubId = req.params.clubid

        await clubModel.updateOne({ clubid: clubId },
            { $push: { "members": [userId] } })

        await userModel.updateOne({ uid: userId },
            { $push: { "joinedclubs": [clubId] } })

        res.json("Accepted club invite successfully")
    }

    catch (err) {
        res.status(404).send(error);
    }
}

//join club
exports.joinClub = async function (req, res) {
    try {

        const userId = req.body.uid
        const clubId = req.params.clubid

        await clubModel.updateOne({ clubid: clubId },
            { $push: { "members": [userId] } })

        await userModel.updateOne({ uid: userId },
            { $push: { "joinedclubs": [clubId] } })

        res.json("Joined club successfully")
    }

    catch (err) {
        res.status(404).send(err);
    }
}

//Follow club
exports.followClub = async function (req, res) {
    try {

        const userId = req.body.uid
        const clubId = req.params.clubid

        await clubModel.updateOne({ clubid: clubId },
            { $push: { followers: [userId] } })

        res.json("Followed club successfully")
    }

    catch (err) {
        res.status(404).send(err);
    }

}

//UnFollow club
exports.unFollowClub = async function (req, res) {
    try {

        const userId = req.body.uid
        const clubId = req.params.clubid

        await clubModel.updateOne({ clubid: clubId },
            { $pullAll: { followers: [userId] } })

        res.json("UnFollowed club successfully")
    }

    catch (err) {
        res.status(404).send(err);
    }

}

//Leave club
exports.leaveClub = async function (req, res) {
    try {
        const myid = req.body.uid;
        const clubid = req.params.clubid;

        await userModel.updateOne(
            { uid: myid },
            { $pullAll: { joinedclubs: [clubid] } }
        );

        await userModel.updateOne(
            { uid: myid },
            { $pullAll: { clubs: [clubid] } }
        );

        await clubModel.updateOne(
            { clubid: clubid },
            { $pullAll: { members: [myid] } }
        );

        res.json("Left club successfully");
    } catch (err) {
        res.status(404).send(err);
    }
};

//Add topic
exports.addTopic = async function (req, res) {
    try {
        const clubid = req.params.clubid;

        await clubModel.updateOne(
            { clubid: clubid },
            { $push: { topics: [req.body] } }
        );

        res.json("Added topic successfully");
    } catch (err) {
        res.status(404).send(err);
    }
};

//Remove topic
exports.removeTopic = async function (req, res) {
    try {
        const clubid = req.params.clubid;

        await clubModel.updateOne(
            { clubid: clubid },
            { $pullAll: { topics: [req.body] } }
        );

        res.json("Removed topic successfully");
    } catch (err) {
        res.status(404).send(err);
    }
};

//Add room belonging to club
exports.addRoom = async function (req, res) {
    try {
        const clubid = req.params.clubid;

        await clubModel.updateOne(
            { clubid: clubid },
            { $push: { rooms: [req.body.roomid] } }
        );

        res.json("Added Room successfully");
    } catch (err) {
        res.status(404).send(err);
    }
};

//Remove room belong to club
exports.removeRoom = async function (req, res) {
    try {
        const clubid = req.params.clubid;

        await clubModel.updateOne(
            { clubid: clubid },
            { $pullAll: { rooms: [req.body.roomid] } }
        );

        res.json("Removed Room successfully");
    } catch (err) {
        res.status(404).send(err);
    }
};

//Delete club
exports.deleteClub = async function (req, res) {
    try {

        await clubModel.deleteOne({ _id: req.params.id });

        res.json("Successfuly deleted club")
    }

    catch (err) {
        res.status(404).send(error);
    }
}