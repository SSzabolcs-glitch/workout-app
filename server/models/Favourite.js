import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const favouriteSchema = new Schema({
  equipment: String,
  gifUrl: String,
  id: String,
  name: String,
  target: String,
  comment: String
});

const Favourite = model('Favourite', favouriteSchema);

export default Favourite;