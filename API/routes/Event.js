import { Router } from "express";
import eventSchema from "../modules/Event.js";
const router = Router();

/**
 * routes for handing events
 * @author anton byström
 */

// Fetches all events
router.route("").get((req, res) => {
  eventSchema
    .find()
    .populate("participants")
    .populate({
      path: "meetings",
      populate: {
        path: "user1",
      },
    })
    .populate({
      path: "meetings",
      populate: {
        path: "user2",
      },
    })
    .populate("organizer") // Add this line to populate the organizer property
    .exec(function (err, event) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).json(event);
    });
});

// Fetches route with specified id
router.route("/:id").get((req, res) => {
  eventSchema
    .findById(req.params.id)
    .populate("participants")
    .populate({
      path: "meetings",
      populate: {
        path: "user1",
      },
    })
    .populate({
      path: "meetings",
      populate: {
        path: "user2",
      },
    })
    .populate("organizer")
    .exec(function (err, event) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).json(event);
    });
});

// Creates a new event
router.route("").post(function (req, res) {
  var newEvent = new eventSchema();
  var data = req.body.body;

  newEvent.location = data.location;
  newEvent.organizer = data.organizer;
  newEvent.map = data.map;
  newEvent.date = data.date;
  newEvent.participants = data.participants;
  newEvent.currentStage = 0;
  newEvent.socket = data.socket;
  newEvent.meetings = data.meetings;
  newEvent.tables = data.tables;

  newEvent.save(function (err) {
    if (err) {
      return res.status(400).send(err);
    }
  });
  return res.status(201).json(newEvent);
});

// Updates a existing event
router.route("/:id").put(function (req, res) {
  const data = req.body.body;

  const tables = {
    tableList: data.tables.tableList,
    size: data.tables.size,
    width: data.tables.width,
    height: data.tables.height,
  };
  eventSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        location: data.location,
        tables: tables,
        map: data.map,
        date: data.date,
        participants: data.participants,
        meetings: data.meetings,
      },
    },
    function (err, event) {
      if (err) {
        console.log(err);
        return res.status(404).send({ error: "event not found" });
      }
      return res.status(200).json(event);
    }
  );
});

// Deletes a existing event
router.route("/:id").delete(function (req, res) {
  eventSchema.findByIdAndDelete(req.params.id, function (err, event) {
    if (err || event === null) {
      return res.status(405).send({ error: err });
    }
    return res.status(200).json({ message: event + " deleted" });
  });
});

export default router;
