const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A note must have a title"],
    },
    body: {
        type: String,
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: [true, "A note must have an author"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
