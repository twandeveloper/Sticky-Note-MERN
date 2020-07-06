const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  noteTitle: String,
  noteText: String,
});

module.exports = mongoose.model("Notes", noteSchema);
