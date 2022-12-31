const notesController = require("../controllers/notesController");
const express = require("express");
const { Router } = require("express");

const notesRouter = express.Router();

notesRouter
    .route("/")
    .get(notesController.getAllNotes)
    .post(notesController.createNote);
notesRouter
    .route("/:id")
    .get(notesController.getNote)
    .delete(notesController.deleteNote)
    .patch(notesController.updateNote);

module.exports = notesRouter;
