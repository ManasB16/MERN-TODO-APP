const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/ToDo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://manas16:MongoDB16@cluster0.h49tqzu.mongodb.net/test"
);

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const { title, content } = req.body;
  TodoModel.create({
    title: title,
    content: content,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.patch("/put/checkbox/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: value })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { title: title, content: content })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server listening on");
});
