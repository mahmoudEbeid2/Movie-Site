import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  image: { type: String },
  title: { type: String, required: true },
  date: { type: String },
  rate: { type: Number },
  numberOfRating: { type: Number },
  description: { type: String },
});

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", FavoriteSchema);
