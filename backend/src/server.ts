import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { Food } from "./food";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://buha360:survival450@cluster0.c7kvkjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch((err) => console.error("Connection error", err));

const upload = multer({ dest: "uploads/" });

app.post("/foods", upload.single("image"), async (req, res) => {
	try {
		const food = new Food({
			name: req.body.name,
			uploader: req.body.uploader,
			description: req.body.description,
		});
		await food.save();
		res.status(201).send(food);
	} catch (error) {
		res.status(400).send({ message: (error as Error).message });
	}
});

app.get("/foods", async (req, res) => {
	try {
		const foods = await Food.find();
		res.json(foods);
	} catch (error) {
		res.status(500).send({ message: (error as Error).message });
	}
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.delete("/foods/:foodId", async (req, res) => {
	try {
		// Ellenőrzés, hogy a felhasználó jogosult-e a törlésre
		const food = await Food.findById(req.params.foodId);
		if (!food) {
			return res.status(404).send({ message: "Nem található étel ezzel az azonosítóval." });
		}

		if (food.uploader !== req.query.uploader) {
			return res.status(403).send({ message: "Nincs jogosultságod az étel törlésére." });
		}

		// Törlés a findOneAndDelete metódussal
		await Food.findOneAndDelete({ _id: req.params.foodId });
		res.send({ message: "Étel sikeresen törölve." });
	} catch (error) {
		res.status(500).send({ message: "Hiba történt az étel törlésekor." });
	}
});
