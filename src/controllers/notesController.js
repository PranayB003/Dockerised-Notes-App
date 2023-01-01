const Note = require("../models/noteModel");

exports.createNote = async (req, res) => {
    const { userID } = req.authPayload;

    try {
        const newNote = new Note({
            title: req.body.title,
            body: req.body.body,
            author: userID,
        });
        const result = await newNote.save();

        res.status(201).send({
            status: "success",
            data: {
                note: {
                    _id: result._id,
                    title: result.title,
                    body: result.body,
                    createdAt: result.createdAt,
                },
            },
        });
    } catch (error) {
        res.sendStatus(500);
    }
};

exports.getAllNotes = async (req, res) => {
    const { userID } = req.authPayload;

    try {
        const notes = await Note.find({ author: userID }, "title").exec();

        res.status(200).send({
            status: "success",
            data: {
                total: notes.length,
                notes,
            },
        });
    } catch (error) {
        res.sendStatus(500);
    }
};

exports.getNote = async (req, res) => {
    const { userID } = req.authPayload;

    try {
        const note = await Note.findOne(
            {
                author: userID,
                _id: req.params.id,
            },
            "-__v"
        ).exec();

        if (!note) {
            res.sendStatus(404);
        } else {
            res.status(200).send({
                status: "success",
                data: { note },
            });
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

exports.updateNote = async (req, res) => {
    const { userID } = req.authPayload;

    const { title, body } = req.body;
    let updates = { body };
    if (title) {
        updates.title = title;
    }

    try {
        const result = await Note.findOneAndUpdate(
            { author: userID, _id: req.params.id },
            updates,
            {
                returnDocument: "after",
                runValidators: true,
                fields: "-__v",
            }
        );
        if (!result) {
            throw new Error("Note not found");
        }

        res.status(200).send({
            status: "success",
            data: {
                note: result,
            },
        });
    } catch (error) {
        res.sendStatus(404);
    }
};

exports.deleteNote = async (req, res) => {
    const { userID } = req.authPayload;

    try {
        const result = await Note.deleteOne({
            author: userID,
            _id: req.params.id,
        });

        if (result.deletedCount === 1) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};
