const activitiesModel = require('../models/activitiesModel')

//Get all activities
exports.getAllActivities = async function(req, res) {

    try {
        const activity = await activitiesModel.find().sort({time: 0})
        res.json(activity)
        
    } catch (error) {
        res.status(404).send(error);
    }
}

//Get all activities
exports.getUserActivities = async function(req, res) {

    try {
        const activity = await activitiesModel.find({to: req.params.uid}).sort({time: 0})
        res.json(activity)
        
    } catch (error) {
        res.status(404).send(error);
    }
}


//Get activity by id
exports.getActivityById = async function(req, res) {

    try {
        const activity = await activitiesModel.findById(req.params.id);
        res.json(activity)
        
    } catch (error) {
        res.status(404).send(error);
    }
}

//Get activity by type
exports.getActivityByType = async function(req, res) {
    try {
        const type = req.params.type
        const activity = await activitiesModel.find({$or: [{type: {$eq:type}}]})
        res.json(activity)
        
    } catch (error) {
        res.status(404).send(error);
    }
}

//Save activity
exports.saveActivity = async function(req, res) {
    const activity = new activitiesModel(req.body)
    
    try{
        await activity.save()
        res.json("Successfuly saved activity")
    }

    catch(err){
        res.status(404).send(err);
    }
}

//Update activity
exports.updateActivity = async function(req, res) {
    try{
        await activitiesModel.updateOne({_id: req.params.id},
            {$set: req.body})

        res.json("Updated activity successfully")
    }

    catch(err){
        res.status(404).send(err);
    }
}

//Delete activity
exports.deleteActivity = async function(req, res) {
    try{

        await activitiesModel.deleteOne({_id: req.params.id});

        res.json("Successfuly deleted activity")
    }

    catch(err){
        res.status(404).send(err);
    }
}
