import { WebSocketServer } from "ws";
import { ReplaySubject, Observable, Subject } from "rxjs";
import eventSchema from "../modules/Event.js";

const START = 1;
const NEXT = 2;
const END = 3;
const NEW_TABLE = 4;
const NEW_MEETING = 5;
const BEFORE_NEXT = 6;
const HAS_RATED = 7;

/**
 * SocketHandler that handles listening to a socket
 * Internally uses reactive programming to handle the passing information
 * @author Sven Englsperger Raswill
 */
class SocketHandler {
  #port;
  #connections;
  #server;
  #stream;
  #event;
  #orgSocket;

  /**
   * Constructor for the SocketHandler
   * @param port is the port to use
   * @param event is the eventID the socket is connected to
   */
  constructor(port, event) {
    this.#port = port;

    this.#server = new WebSocketServer({
      port: this.#port,
    })
      .on("error", (err) => {
        if(err.errno == -98)
          return null;
        console.log(err);
      });

    this.#event = event;

    this.#connections = new Subject();
    this.#stream = new ReplaySubject(3);
    // this.#stream = [];
    this.#connections.subscribe((e) => this.#listenToSocket(e));

  }

  /**
   * Method to start the socket, to add any new listeners
   */
  connect() {
    this.#server.on("connection", (socket) => {
      if (!this.#orgSocket) this.#orgSocket = socket;
      // console.log(socket);
      // this.#stream.push(socket);
      new Observable((e) => e.next(socket)).subscribe(this.#connections);
    });
  }

  /**
   * Method to close the Socket
   * shuts down everything internally as well
   */
  close() {
    console.log("CALLED");
    this.#connections.complete();
    this.#stream.complete();
    this.#server.close();
  }

  /**
   * Methd to listen for any connections
   * @param socket is the socket to add to the internal Subject
   */
  #listenToSocket(socket) {
    new Observable((em) => {
      socket.on("message", (msg) => {
        var new_msg = JSON.parse(msg);
        switch (new_msg.code) {
          case START:
            eventSchema.findOne({ _id: this.#event }).exec((err, event) => {
              if (err) new_msg.message += "DIFF: COULD NOT UPDATE";
              console.log(event);
              if (event.currentStage < 0) {
                eventSchema
                  .findOneAndUpdate(
                    { _id: event._id },
                    { currentStage: 1 },
                    { new: true }
                  )
                  .exec((err, event) => {
                    console.log(event);
                    if (err) new_msg.message += "DIFF: COULD NOT UPDATE";
                    new_msg.stage = 1;
                    em.next(new_msg);
                  });
              } else {
                eventSchema
                  .findOneAndUpdate(
                    { _id: event._id },
                    { currentStage: event.currentStage },
                    { new: true }
                  )
                  .exec((err, event) => {
                    if (err) new_msg.message += "DIFF: COULD NOT UPDATE";
                    new_msg.stage = event.currentStage;
                    em.next(new_msg);
                  });
              }
            });
            em.next(new_msg);
            break;
          case NEXT:
            eventSchema.findOne({ _id: this.#event }).exec((err, event) => {
              if (err) new_msg.message += "DIFF: COULD NOT UPDATE";
              eventSchema
                .findOneAndUpdate(
                  { _id: event._id },
                  { currentStage: event.currentStage + 1 },
                  { new: true }
                )
                .exec((err, event) => {
                  if (err) new_msg.message += "DIFF: COULD NOT UPDATE";
                  new_msg.stage = event.currentStage;
                  em.next(new_msg);
                });
            });
            break;
          case BEFORE_NEXT:
            em.next(new_msg);
            break;
          case HAS_RATED:
            this.#orgSocket.send(JSON.stringify(new_msg));
            break;
          case END:
            eventSchema
              .findOneAndUpdate({ _id: this.#event }, { currentStage: 0 })
              .exec(() => {
                em.next(new_msg);
                this.close();
              });
            break;
          case NEW_TABLE:
          case NEW_MEETING:
            this.#orgSocket.send(JSON.stringify(new_msg));
            break;
          default:
            em.next(new_msg);
            break;
        }
      });
    }).subscribe((e) => {
      // this.#stream.forEach(s => s.send(JSON.stringify(e)));
      this.#stream.next(e);
    });

    this.#stream.subscribe({
      next: (event) => {
        console.log(this.#port, "EVENT", event);
        if (event != undefined) socket.send(JSON.stringify(event));
      },
      error: (err) => {
        console.log("ERROR: " + err);
      },
    });
  }
}

/**
 * Function to get a workerThread with a socket
 * @param port is the given port to run the socket on
 * @param event - is the id of the event the socket is connected to
 * @return a workerThread with the socket in it
 *        close the socket with .terminate() and it will close the internal socket as well
 */
export function getSocket(port, event) {
  return new SocketHandler(port, event);
}
