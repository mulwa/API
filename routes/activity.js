const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')

//Get all activities
router.get('/', activityController.getAllActivities)

//Get activities for user
router.get('/to/:uid', activityController.getUserActivities)

//Get activity by id
router.get('/:id', activityController.getActivityById)

//Get activity by type
router.get('/type/:type', activityController.getActivityByType)

//Save activity
router.post('/', activityController.saveActivity)

//Update activity
router.patch('/:id', activityController.updateActivity)

//Delete activity
router.delete('/:id', activityController.deleteActivity)

module.exports = router