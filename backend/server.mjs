import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";

import pets from "./routes/pets.mjs";
import tasks from "./routes/tasks.mjs";
import history from "./routes/history.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/pets', pets);
app.use('/tasks', tasks);
app.use('/history', history);

// start the Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${PORT}`);
});
