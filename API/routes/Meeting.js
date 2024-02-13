import { Router } from "express";
import meetingSchema from "../modules/Meeting.js";
const router = Router();

/**
 * routes for handing meetings
 * @author anton byström
 */

// Fetches all meetings
router.route("").get((req, res) => {
  meetingSchema
    .find()
    .populate("user1")
    .populate("user2")
    .exec(function (err, meeting) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).json(meeting);
    });
});

// Fetches specified meeting from specified id
router.route("/:id").get(async (req, res) => {
  meetingSchema
    .findById(req.params.id)
    .populate("user1")
    .populate("user2")
    .exec((err, meeting) => {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).json(meeting);
    });
});

// Creates a new meeting
router.route("").post(function (req, res) {
  var data = req.body.body;
  var retVal = [];
  if (data.length > 0) {
    for (const each of data) {
      var newMeeting = new meetingSchema();
      if (each.User1 === "" || each.User2 === "") {
        return res.status(404).send({ message: "users are required" });
      }
      newMeeting.user1 = each.user1;
      newMeeting.user2 = each.user2;
      newMeeting.table = each.table;
      newMeeting.user1Results = each.user1Results;
      newMeeting.user2Results = each.user2Results;
      newMeeting.meetingNumber = each.meetingNumber;

      newMeeting.save(function (err) {
        if (err) {
          return res.status(400).send(err);
        }
      });
      retVal.push(newMeeting);
    }
    return res.status(201).send(retVal);
  } else {
    var newMeeting = new meetingSchema();
    if (data.User1 === "" || data.User2 === "") {
      return res.status(404).send({ message: "users are required" });
    }
    meetingSchema.findOne({ _id: req.params.id }, function (err, meeting) {
      if (err) {
        return res.status(404).send(err);
      }
      if (meeting === null) {
        if (data.User1 === "" || data.User2 === "") {
          return res.status(404).send({ message: "users are required" });
        }
        newMeeting.user1 = data.user1;
        newMeeting.user2 = data.user2;
        newMeeting.table = data.table;
        newMeeting.user1Results = data.user1Results;
        newMeeting.user2Results = data.user2Results;
        newMeeting.meetingNumber = data.meetingNumber;

        newMeeting.save(function (err) {
          if (err) {
            return res.status(400).send(err);
          }
        });
        return res.status(201).json(newMeeting);
      } else {
        return res.status(404).send({ message: "meeting id already exists" });
      }
    });
  }
});

// Updates existing meeting with specified id
router.route("/:id").put(function (req, res) {
  const data = req.body.body;

  meetingSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        user1: data.user1,
        user2: data.user2,
        table: data.table,
        user1Results: data.user1Results,
        user2Results: data.user2Results,
        meetingNumber: data.meetingNumber,
      },
    },
    function (err, meeting) {
      if (err) {
        return res.status(404).send({ error: "meeting not found" });
      }
      return res.status(200).json(meeting);
    }
  );
});

// Deletes meeting with specified id
router.route("/:id").delete(function (req, res) {
  meetingSchema.findByIdAndDelete(req.params.id, function (err, meeting) {
    if (err || profile === null) {
      return res.status(404).send({ error: err });
    }
    return res.status(200).json({ message: meeting + " deleted" });
  });
});

export default router;
