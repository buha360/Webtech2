import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
	name: String,
	uploader: String,
	description: String,
});

export const Food = mongoose.model("Food", foodSchema);
