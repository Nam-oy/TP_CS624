// routes/pets.js
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all pets
router.get("/", async (req, res) => {
  const pets = await db.collection("pets").find({}).toArray();
  res.status(200).send(pets);
});

// GET a single pet by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const pet = await db.collection("pets").findOne({ _id: new ObjectId(id) });

  if (!pet) {
    return res.status(404).send({ message: "Pet not found" });
  }

  res.status(200).send(pet);
});

// POST a new pet
router.post("/", async (req, res) => {
  const { name, species, age } = req.body;

  if (!name || !species || !age) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const newPet = { name, species, age };
  const result = await db.collection("pets").insertOne(newPet);

  res.status(201).send(result);
});

// PATCH (update) a pet by ID
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const result = await db.collection("pets").updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  res.status(200).send(result);
});

// DELETE a pet by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.collection("pets").deleteOne({ _id: new ObjectId(id) });

  res.status(200).send(result);
});

export default router;
