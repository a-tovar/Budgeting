const express = require("express");
const DefaultCategory = require("../../models/DefaultCategory");

const router = express.Router();

// GET /defaultCateogries
router.get("/", (req, res) => {
  DefaultCategory.find()
    // .sort()
    .then((categories) => res.json(categories));
});

// TODO: add auth to post and delete

// POST /defaultCategories
router.post("/", (req, res) => {
  const data = req.body;
  const newCategory = new DefaultCategory({
    name: data.name,
  });
  newCategory
    .save()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE api/items/:id
router.delete("/:id", (req, res) => {
  DefaultCategory.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json({ success: false }));
});

module.exports = router;
