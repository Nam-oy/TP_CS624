// routes/tasks.js
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("tasks");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get a single task
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("tasks");
    const task = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    console.error("Failed to fetch task:", err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = {
      pet_id: new ObjectId(req.body.pet_id),
      petName: req.body.petName,
      activity: req.body.activity,
      description: req.body.description,
      datetime: new Date(req.body.datetime),
      status: req.body.status || "pending",
    };

    const collection = db.collection("tasks");
    const result = await collection.insertOne(task);
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to create task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
router.patch("/:id", async (req, res) => {
  try {
    const updates = {
      $set: {
        pet_id: new ObjectId(req.body.pet_id),
        petName: req.body.petName,
        activity: req.body.activity,
        description: req.body.description,
        datetime: new Date(req.body.datetime),
        status: req.body.status,
      },
    };

    const collection = db.collection("tasks");
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      updates
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Task not found" });

    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to update task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("tasks");
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Task not found" });

    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to delete task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
