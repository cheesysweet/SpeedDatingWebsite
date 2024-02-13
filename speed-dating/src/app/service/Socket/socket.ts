import { Observer, Subject } from 'rxjs';
import { AppConstants } from 'src/app/constants';
import { ConstantBackoff, Websocket, WebsocketBuilder } from 'websocket-ts';
import { Message } from './Message';
import { Codes } from './Codes';

/**
 * Class that handles the connection to a given socket
 * @author Sven Englsperger Raswill
 */
export class Socket {
  // This holds the websocket
  private client: Websocket;
  private messageObservable: Subject<Message> = new Subject();

  /**
   * Constructor for the class
   * @param socket is the socket-number to use
   * @param listener is the listener that will listen to the incoming messages from the socket
   *        All messages come as {@link Message} objects
   */
  constructor(socket: Number, listener: Observer<Message>) {
    const address = AppConstants.localWS + `:${socket}`;
    this.client = new WebsocketBuilder(address)
      .onOpen((_i) => {
        this.messageObservable.subscribe(listener);
      })
      .onMessage((_i, msg) => {
        const gotten_message: Message = JSON.parse(msg.data.toString());
        this.messageObservable.next(gotten_message);
      })
      .onClose((_i, _) => {
        this.messageObservable.next({
          name: '',
          message: '',
          stage: 0,
          code: Codes.END,
        });
      })
      .withBackoff(new ConstantBackoff(1000))
      .build();
  }

  /**
   * Used to internally add information, such as the name of the one sending the message
   * This to ourself handle who actually sends the message
   * @param content - the content to send
   */
  private internalSendMessage(content: Message): void {
    // TODO add the name gotten from the profile stored in memory
    // content.name = ADD IT HERE
    this.client.send(JSON.stringify(content));
  }

  /**
   * Function to send a message
   * @param content is the content to send
   * @return a WebSocket-object
   */
  public sendMessage(content: Message) {
    this.internalSendMessage(content);
  }

  /**
   * Used to update the meetingState
   * @param token - any other information you want to send
   */
  public changeMeetingStage(token: Message) {
    token.code = Codes.NEXT;
    this.internalSendMessage(token);
  }

  /**
   * Used to start the startMeeting
   * @param token - any other information you want to send;
   */
  public startMeeting(token: Message) {
    token.code = Codes.START;
    this.internalSendMessage(token);
  }

  /**
   * Used to send the message to end the meeting
   * @param token - any other information to send
   */
  public endMeeting(token: Message) {
    token.code = Codes.END;
    this.internalSendMessage(token);
  }

  /**
   * Used by a user to change table
   * @param token - any other information to send
   */
  public changeTable(token: Message) {
    token.code = Codes.NEW_TABLE;
    this.internalSendMessage(token);
  }

  /**
   * Used by a user to change meeting
   * @param token - any other information to send
   */
  public changeMeeting(token: Message) {
    token.code = Codes.NEW_MEETING;
    this.internalSendMessage(token);
  }

  /**
    * Used to simply send that the socket should update their information
    */
  public updateInformation(token: Message) {
    token.code = Codes.NONE;
    this.internalSendMessage(token);
  }

  /**
    * Used to send that it is before the next stage
    */
  public sendBeforeNext(token: Message) {
    token.code = Codes.BEFORE_NEXT;
    this.internalSendMessage(token);
  }

  /**
    * Used to send the information that a person has rated their match
    */
  public sendHasRated(token: Message) {
    token.code = Codes.HAS_RATED;
    this.internalSendMessage(token);
  }

  /**
   * Used to close the socket
   */
  public close(): void {
    this.client.close();
  }
}
