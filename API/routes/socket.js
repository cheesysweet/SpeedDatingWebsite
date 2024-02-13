import { Router } from "express";
import { getSocket } from "../Socket/socket.js";
import eventSchema from "../modules/Event.js";
const router = Router();

let socketArray = {};
const placeHolder = { name: "placeholder" };
// TODO add in more security, such as checking for if the correct person
// closes the connection
router
  .route("")
  // Get a socket-number
    .get((req, res) => {
        eventSchema.find().exec((err, events) => {
            for (let each of events) {
                socketArray[each.socket] = placeHolder;
            }
            let socketNumber = Math.floor(Math.random() * 9000) + 1000;
            while (socketArray[socketNumber] === placeHolder)
                socketNumber = Math.floor(Math.random() * 9000) + 1000;
            res.status(200).json({socket: socketNumber});
        });
    });
router
  .route("/:eventID/:socket")
  // Get a socket
  .get((req, res) => {
    eventSchema.findOne({ _id: req.params.eventID }).exec((err, event) => {
      if (err) return res.status(404).send(err);
      if (event.socket == 0)
        return res.status(404).send({ err: "Need socketnumber" });
      try {
        const socket = getSocket(event.socket, event._id);
        if (socket) {
          socketArray[req.params.socket] = socket;
          socketArray[req.params.socket].connect();
        } else {
          socketArray[req.params.socket];
        }
      } catch (e) {
        console.log(e);
        return res.status(404).json({ err: "That socket is already active" });
      }
      res.status(200).json({ socket: req.params.socket });
    });
  })
  // Delete a socket
  .delete((req, res) => {
    console.log(socketArray);
    if (!socketArray[req.params.socket])
      return res.status(404).send({ err: "No such socket" });
    // socketArray[req.params.socket].terminate();
    socketArray[req.params.socket].close();
    delete socketArray[req.params.socket];
    res.status(200).json({ socket: req.params.socket });
  });

export default router;
