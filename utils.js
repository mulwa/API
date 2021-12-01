const userModel = require('./models/userModel')
const express = require('express')
const admin = require("firebase-admin");



/**
 * Send notification
 * @param {String} userToken the user token.
 * @param {String} title The title of the notification.
 * @param {String} msg The message.
 * @param {String} screenA The screen to go to when you click.
 * @param {String} id The id of what to go to.
 * @return {String} updated user object.
 */
 function sendNotification(userToken, title, msg, screenA, id) {
    const payload = {
      "notification": {
        "title": title,
        "body": msg,
      },
      "data": {
        "click_action": "FLUTTER_NOTIFICATION_CLICK",
        "sound": "default",
        "status": "done",
        "screen": screenA,
        "id": id,
      },
    };
  
    return admin.messaging().sendToDevice(userToken, payload)
        .then(function(response) {
          console.log("Successfully sent message:", response);
          return response;
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });
  }

  /**
 * Send notification to referrer
 * @param {String} id The id of what to go to.
 * @param {String} title The title of the notification.
 * @param {String} msg The message.
 * @param {String} screenA The screen to go to when you click.
 * @param {String} id The id of what to go to.
 */
  function sendToReferrerNotification(referrerId, title, msg, screenA, id) {

    try {
        userModel.findById(referrerId).then((value) => { 
            var referrer = new userModel(value)
            sendNotification(referrer.firebasetoken, title, msg, screenA, id)
        })
        
        
    } catch (error) {
        console.log(error);
    }

  }

  function saveActivity(actionKey, fromFullName, type, actioned, fromImageUrl, toId, message) {
      var data = {
        "imageurl": fromImageUrl,
        "name": fromFullName,
        "type": type,
        "actionkey": actionKey,
        "actioned": actioned,
        'to': toId,
        "message": message,
        "time": Date.now(),
      }
  }

  module.exports = { sendNotification, sendToReferrerNotification, saveActivity };
