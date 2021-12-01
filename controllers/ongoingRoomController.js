
const config = require('../config');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDocs, getDoc,
    updateDoc, arrayUnion, arrayRemove, addDoc, setDoc, deleteDoc,
    query, where, orderBy } = require('firebase/firestore/lite');
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

//Save room
exports.saveRoom = async function (req, res) {
    try {
        const room = req.body

        const roomRef = collection(db, 'rooms')
        const docRef = await addDoc(roomRef, room);

        res.send("Save successful. Id: " + docRef.id);

    } catch (error) {
        res.json({ message: error + " f" })
    }

}

//Get all rooms
exports.getAllRooms = async function (req, res) {
    try {

        const roomcol = collection(db, 'rooms')
        const roomsSnapshot = await getDocs(roomcol);
        const roomsList = roomsSnapshot.docs.map((doc) => {
            return {id:doc.id,...doc.data()}
        });
        res.send(roomsList);


    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get rooms by id
exports.getRoomById = async function (req, res) {
    try {

        const roomcol = doc(db, 'rooms/' + req.params.id)
        const roomsSnapshot = (await getDoc(roomcol)).data();
        res.send(roomsSnapshot + " kkkkkkk");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get private rooms
exports.getPrivateRooms = async function (req, res) {
    try {

        const roomcol = collection(db, 'rooms')
        const queryroom = query(roomcol,
            where("roomtype", "==", "private"),
            where("invitedfriends", "array-contains-any", req.body.uid),
            orderBy("created_time", 'desc'))
        const roomsSnapshot = await getDocs(queryroom);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());
        res.send(roomsList);

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get public rooms
exports.getPublicRooms = async function (req, res) {
    try {

        const roomcol = collection(db, 'rooms')
        const queryroom = query(roomcol,
            where("roomtype", "==", "public"),
            orderBy("created_time", 'desc'))
        const roomsSnapshot = await getDocs(queryroom);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());
        res.send(roomsList);

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get social rooms
exports.getSocialRooms = async function (req, res) {
    try {

        const roomcol = collection(db, 'rooms')
        const queryroom = query(
            roomcol,
            where("roomtype", "==", "social"),
            where("ownerid", "in", req.body.followers),
            orderBy("created_time", 'desc'))
        const roomsSnapshot = await getDocs(queryroom);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());
        res.send(roomsList);

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get open club rooms
exports.getOpenClubRooms = async function (req, res) {
    try {

        const roomcol = collection(db, 'rooms')
        const queryroom = query(
            roomcol,
            where("roomtype", "==", "club"),
            where("openToMembersOnly", "==", false),
            orderBy("created_time", 'desc'))
        const roomsSnapshot = await getDocs(queryroom);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());
        res.send(roomsList);

    } catch (error) {
        res.json({ message: error + " f" })
    }
}


//Get closed club rooms
exports.getClosedClubRooms = async function (req, res) {
    try {

        const roomcol = collection(db, 'rooms')
        const queryroom = query(
            roomcol,
            where("roomtype", "==", "club"),
            where("openToMembersOnly", "==", true),
            where("clubmembers", "array-contains-any", req.params.uid),
            orderBy("created_time", 'desc'))
        const roomsSnapshot = await getDocs(queryroom);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());
        res.send(roomsList);

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get raised hands
exports.getRaisedHands = async function (req, res) {
    try {
        const roomcol = doc(db, 'rooms/' + req.params.id)
        const roomsSnapshot = (await getDoc(roomcol)).data();
        res.send(roomsSnapshot['raisedhands'] + " kkkkkkk");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get room users
exports.getRoomUsers = async function (req, res) {
    try {
        const roomcol = collection(db, 'rooms/' + req.params.id + '/users')
        const roomsSnapshot = await getDocs(roomcol);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());
        res.send(roomsList);
    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Get room users by id
exports.getRoomUserById = async function (req, res) {
    try {
        const roomcol = doc(db, 'rooms/' + req.params.id + '/users/' + req.body.uid)
        const roomsSnapshot = await getDoc(roomcol);
        res.send(roomsSnapshot.data() + "fff");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}


//Update room
exports.updateRoom = async function (req, res) {

    try {
        const roomid = req.params.id

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, req.body);


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }

}

//Add to raised hands
exports.addToRaisedHands = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'raisedhands': arrayUnion(user) });

        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Remove to raised hands
exports.removeFromRaisedHands = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'raisedhands': arrayRemove(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add user to room collection
exports.addToUserCollection = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body

        const room = doc(db, 'rooms/' + roomid + '/users/' + user['uid'])
        await setDoc(room, user)

        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Update user in room collection
exports.updateUserInCollection = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body

        const userRef = doc(db, 'rooms/' + roomid + '/users/' + req.params.uid)
        await updateDoc(userRef, user);


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add user to room collection
exports.removeUserFromCollection = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid + '/users/' + user)
        await deleteDoc(room)

        //Remove from raised hands
        const roomRef = doc(db, 'rooms/' + roomid)
        await updateDoc(roomRef, { 'raisedhands': arrayRemove(user) });

        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add user to room collection
exports.removeAllUsersFromCollection = async function (req, res) {
    try {
        const roomid = req.params.id

        //Get all users
        const roomcol = collection(db, 'rooms/' + roomid + '/users')
        const roomsSnapshot = await getDocs(roomcol);
        const roomsList = roomsSnapshot.docs.map(doc => doc.data());

        roomsList.forEach(async element => {

            const userRef = doc(db, 'rooms/' + roomid + '/users/' + element['uid'])
            await deleteDoc(userRef)

            //Remove from raised hands
            const roomRef = doc(db, 'rooms/' + roomid)
            await updateDoc(roomRef, { 'raisedhands': arrayRemove(element['uid']) });

        });

        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Save room
exports.deleteRoom = async function (req, res) {
    try {
        const roomId = req.params.id

        const roomRef = doc(db, 'rooms/' + roomId)
        await deleteDoc(roomRef);

        res.send("Delete successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }

}

//Add user to removed users
exports.addToRemovedUsersInRoom = async function (req, res) {

    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'removedusers': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add to active moderators
exports.addToActiveModeratorsInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'activemoderators': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Remove from active moderators
exports.removeFromActiveModeratorsInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'activemoderators': arrayRemove(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add to all moderators
exports.addToAllModeratorsInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'allmoderators': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Remove from all moderators
exports.removeFromAllModeratorsInRoom = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'allmoderators': arrayRemove(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
 }

//Add to invited moderators
exports.addToInvitedModeratorsInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'invitedasmoderator': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Remove from invited moderators
exports.removeFromInvitedModeratorsInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'invitedasmoderator': arrayRemove(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add to invited users
exports.addToInvitedUsersInRoom = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'invitedusers': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
 }

//Remove from invited users
exports.removeFromInvitedUsersInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'invitedusers': arrayRemove(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add to speakers
exports.addToSpeakersInRoom = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'speakers': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
 }

//Remove from speakers
exports.removeFromSpeakersInRoom = async function (req, res) { 
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'speakers': arrayRemove(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
}

//Add to club members
exports.addToClubMembersInRoom = async function (req, res) {
    try {
        const roomid = req.params.id
        const user = req.body.uid

        const room = doc(db, 'rooms/' + roomid)
        await updateDoc(room, { 'clubmembers': arrayUnion(user) });


        res.send("Update successful");

    } catch (error) {
        res.json({ message: error + " f" })
    }
 }