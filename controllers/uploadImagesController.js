const config = require('../config');
const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage")
const userModel = require('../models/userModel')

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app)

exports.uploadImage = async function (req, res) {
    const filename = "1.jpg"
    const reference = "test"
    const user = ""
    const file = "11111"

    const imagesRef = ref(storage, reference + '/' + filename);
    const uploadTask = uploadBytesResumable(imagesRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    uploadTask.on('state_changed',
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                console.log('File available at', downloadURL);

                res.json(downloadURL)
            });
        })
}