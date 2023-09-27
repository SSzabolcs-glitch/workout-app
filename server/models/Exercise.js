import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
  bodypart: String,
  equipment: String,
  gifUrl: String,
  id: String,
  name: String,
  target: String,
});

const Exercise = model('Exercise', exerciseSchema);

export default Exercise;