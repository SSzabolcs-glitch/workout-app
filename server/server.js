import mongoose from 'mongoose';
import express from 'express';
import Exercise from './models/Exercise.js'
import Favourite from './models/Favourite.js'
import cors from 'cors';

import DailyWorkoutModel from "./models/DailyWorkoutModel.js"

const app = express();



app.use(express.json());

app.use(cors())

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header('Access-Control-Allow-Methods', '*');
//     next();
// });


mongoose.connect("mongodb+srv://exercise:asd123@exercisedb.syj4k05.mongodb.net/test")
    .then(mongoose => { console.log("Database Ok!") })
    .catch(err => { console.log("Database not connected!") })

app.get('/api/exercise', async (req, res) => {
    try {
        const items = await Exercise.aggregate([
            { $addFields: { id: { $toInt: "$id" } } },
            { $match: {} },
        ]).sort({ "id": 1 });

        res.send(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})
app.get('/api/exercise/:id', async (req, res) => {
    let startPoint = parseInt(req.params.id);
    let endPoint = parseInt(req.params.id) * 15;
    console.log(endPoint);
    if (parseInt(req.params.id) === 1) {
        startPoint = 0;
    } else {
        startPoint = (endPoint - 15);
    }
    try {
        const items = await Exercise.find({}).sort({ id: 1 }).lean();
        const results = items.slice(startPoint, endPoint);
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});



app.post('/api/exercise', (req, res) => {
    const bodypart = req.body.bodypart;
    const equipment = req.body.equipment;
    const gifUrl = req.body.gifUrl;
    const id = req.body.id;
    const name = req.body.name;
    const target = req.body.target;

    const exercise = new Exercise({
        bodypart,
        equipment,
        gifUrl,
        id,
        name,
        target,
    });

    exercise.save()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json({ success: false }));
});

//searchbar input POST
app.post('/api/searchall/', async (req, res) => {
    let target = req.body.searchvalue;

    console.log("we are in the server POST request")


    const items = await Exercise.find(
        { $or: [{ "name": { "$regex": target, "$options": "i" } }, { "id": { "$regex": target, "$options": "i" } }, { "target": { "$regex": target, "$options": "i" } }] },
    );

    res.json(items);

})




app.post('/api/search/', async (req, res) => {
    let target = req.body.searchvalue;
    let currentPage = parseInt(req.body.currentPage);
    console.log(currentPage);
    let endPoint = parseInt(currentPage) * 15;
    let startPoint = parseInt(endPoint) - 15;
    const items = await Exercise.find(
        {
            $or: [{ "name": { "$regex": target, "$options": "i" } },
            { "id": { "$regex": target, "$options": "i" } },
            { "target": { "$regex": target, "$options": "i" } }]
        },
    );
    const results = items.slice(startPoint, endPoint)
    res.json(results);
});


app.post('/api/favourites', (req, res) => {
    console.log("a szerver favourites post requestjében vagyunk");

    Exercise.findOne({ id: req.body.favouriteId })
        //.then(foundFavourite => console.log(foundFavourite))
        .then(foundFavourite => {

            console.log(foundFavourite)
            const equipment = foundFavourite.equipment;
            const gifUrl = foundFavourite.gifUrl;
            const id = foundFavourite.id;
            const name = foundFavourite.name;
            const target = foundFavourite.target;
            const comment = "";

            const newFavourite = new Favourite({
                equipment,
                gifUrl,
                id,
                name,
                target,
                comment
            });
            
            /*
            Favourite.findOne({id: req.body.favouriteId})
                .then(data => {
                    console.log(data)
                    talalat = true
                    console.log("talalat"+talalat)
                    if(talalat===false){
                        newFavourite.save()
                            .then(newFavourite => console.log("save is megvolt a databasebe"))
                            .then(newFavourite => res.json(newFavourite))
                            .catch(err => res.status(400).json({ success: false }));
                        }
                })
            */ 
            newFavourite.save()
                .then(newFavourite => console.log("save is megvolt a databasebe"))
                .then(newFavourite => res.json(newFavourite))
                .catch(err => res.status(400).json({ success: false }));

        })
        .catch(error => {
            console.error(error)
        })
});

app.get('/api/favourites', (req, res) => {
    console.log("a szerver favourites get requestjében vagyunk");

    Favourite.find({})
        .then(allFavourites => res.json(allFavourites))
        .catch(err => res.status(400).json({ success: false }));
})

app.delete('/api/favourites/:id', (req, res) => {
    console.log("a szerver favourites delete requestjében vagyunk");

    Favourite.deleteOne({ id: req.params.id })
        .then(deletedFavourite => console.log(deletedFavourite))
        .catch(err => res.status(400).json({ success: false }));

})


//add/update comments with patch
app.patch('/api/favourites', (req, res) => {
    console.log("a szerver favourites patch requestjében vagyunk")
    console.log(req.body.buttonId)

    const filter = {id:req.body.buttonId}
    const update = {comment:req.body.editedComment}

    //should set the new option to true to return the document after update was applied

    Favourite.findOneAndUpdate(filter, update, {new:true})
        .then(updatedComment => console.log(updatedComment))
        .catch(error => {
            console.error(error)})
});


//DAILY WORKOUTS
app.get("/api/dailyexercises", async (req, res, next) => {
    console.log("szerver GET")
    try {
        const dailyexercises = await DailyWorkoutModel.find({});
        console.log(dailyexercises)
        return res.json(dailyexercises);
    }
    catch (err) {
        return next(err) 
    }
})

app.post("/api/dailyexercises", async (req, res) => {
    console.log(req.body)
    const newDailyExercise = req.body;
    try {
        const savedDailyExercise = await DailyWorkoutModel.create(newDailyExercise);
        return res.json(savedDailyExercise);
      } catch (err) {
        return next(err);
      }
})

app.delete("/api/dailyexercises/:id", async (req, res, next) => {
    console.log("SERVER EXERCISE DELETE")
    console.log(req.params.id)
    try {
        const dailyexercise = await DailyWorkoutModel.findById(req.params.id);
        const deleted = await dailyexercise.deleteOne();
        return res.json(deleted);
      } catch (err) {
        return next(err);
      }
})

app.patch("/api/dailyexercises/:id", async (req, res, next) => {
    console.log("SERVER EXERCISE PATCH")
    try {
      const dailyexercise = await DailyWorkoutModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
      );
      return res.json(dailyexercise);
    } catch (err) {
      return next(err);
    }
  });




app.listen(3001, () => console.log('Server started on port 3001'));



