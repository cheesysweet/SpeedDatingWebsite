import { Router } from "express";
import profileSchema from "../modules/Profile.js";
const router = Router();

/**
 * routes for handing profiles
 * @author anton byström
 */

// Fetches all profiles
router.route("").get((req, res) => {
  profileSchema
    .find()
    .populate({
      path: 'events',
      populate: {
        path: 'meetings',
        populate: {
          path: 'user1'
      }}})
      .populate({
        path: 'events',
        populate: {
          path: 'meetings',
          populate: {
            path: 'user2'
        }}})
    .exec(function (err, profile) {
      if (err) {
        return res.status(404).json(err);
      }
      return res.status(200).json(profile);
    });
});

// Fetches profile with specified id
router.route("/:id").get((req, res) => {
  profileSchema
    .findOne({ userName: req.params.id })
    .populate({
      path: 'events',
      populate: {
        path: 'meetings',
        populate: {
          path: 'user1'
      }}})
      .populate({
        path: 'events',
        populate: {
          path: 'meetings',
          populate: {
            path: 'user2'
        }}})
    .exec(function (err, profile) {
      if (err) {
        return res.status(404).json(err);
      }
      if(!profile) {
        return res.status(401).json({ error: "Wrong username" });
      }
      return res.status(200).json(profile);
    });
})
// Logins the profile with the specified ID
.post((req, res) => {
  const password = req.body.body.password;

  if(!password) return res.status(404).json({ error: "Need a password"});

  profileSchema
    .findOne({ userName: req.params.id })
    .populate({
      path: 'events',
      populate: {
        path: 'meetings'
      }})
    .exec(function (err, profile) {
      if (err) {
        return res.status(404).json(err);
      }
      if(!profile) {
        return res.status(401).json({ error: "Wrong username" });
      }
      if (profile.password !== password) {
        return res.status(401).json({ error: "Wrong password" });
      } else {
        return res.status(200).json(profile);
      }
    });
});

// Creates a new profile
router.route("").post(function (req, res) {
  var newProfile = new profileSchema();
  var data = req.body.body;

  profileSchema.findOne({ userName: data.userName }, function (err, profile) {
    if (err) {
      return res.status(404).json(err);
    }
    if (profile === null) {
      newProfile.userName = data.userName;
      newProfile.name = data.name;
      newProfile.sex = data.sex;
      newProfile.password = data.password;
      newProfile.organizer = data.organizer;
      newProfile.picture = data.picture;
      newProfile.phoneNumber = data.phoneNumber;
      newProfile.description = data.description;
      newProfile.interests = data.interests;
      newProfile.events = data.events;

      newProfile.save(function (err) {
        if (err) {
          return res.status(400).json(err);
        }
      });
      return res.status(201).json(newProfile);
    } else {
      return res.status(404).json({ message: "Profile already exists" });
    }
  });
});

// Updates profile of specified profile
router.route("/:id").put(function(req, res) {
  const data = req.body.body;
  
  profileSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        userName: data.userName,
        name: data.name,
        sex: data.sex,
        password: data.password,
        organizer: data.organizer,
        picture: data.picture,
        phoneNumber: data.phoneNumber,
        description: data.description,
        interests: data.interests,
        events: data.events,
      },
    },
    function (err, profile) {
      if (err) {
        return res.status(404).json({ error: "profile not found" });
      }
      return res.status(200).json(profile);
    }
  );
});

// Deletes specified profile
router.route("/:id").delete(function (req, res) {
  profileSchema.findByIdAndDelete(req.params.id, function (err, profile) {
    if (err || profile === null) {
      return res.status(404).json({ error: err });
    }
    return res.status(200).json({ message: profile + " deleted" });
  });
});

export default router;
