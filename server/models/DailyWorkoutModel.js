import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const DailyWorkoutSchema = new Schema({
    name: String,
    id: String,
    target: String,
    equipment: String,
    sets: Number,
    reps: Number,
    weight: Number,
    notes: String
});

const DailyWorkoutModel = model('Dailyworkout', DailyWorkoutSchema);

export default DailyWorkoutModel;