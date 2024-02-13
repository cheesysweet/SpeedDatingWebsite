import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../constants';
// Interfaces
import { Profile } from '../../Interfaces/Profile';
import { Meeting } from '../../Interfaces/Meeting';
import { Event } from '../../Interfaces/Event';
import { SocketInterface } from '../Socket/interface';

const API_URL = AppConstants.localURL;
//const API_URL = AppConstants.herokuURL;

@Injectable({
    providedIn: 'root'
})
/**
 * Class that handles the connections currently for everything
 */
export class Connection {
  constructor(private http: HttpClient) { }

  /**
   * Used to get a singel profile
   * @param login - the user to get
   * @return an {@link Observable} to the Profile-response, contains {@link Profile}
   */
  getProfile(login: string): Observable<Profile> {
    return this.http.get<Profile>(API_URL + `profile/${login}`, { responseType: 'json' });
  }

  /**
   * used to get all profiles
   * @return an {@link Observable} to the Profile-response containing an array of {@link Profile}
   */
  getProfiles(): Observable<Array<Profile>> {
    return this.http.get<Array<Profile>>(API_URL + 'profile/', { responseType: 'json' });
  }

  /**
   * used to add a newInfo user
   * @param newInfo - is a {@link Profile}
   * @return an {@link Observable} to the Profile-response, contains {@link Profile}
   */
  postProfile(newInfo: Profile): Observable<Profile> {
    return this.http.post<Profile>(API_URL + 'profile/', { body: newInfo });
  }

  /**
   * Used to update an existing user
   * @param id - is the id of the Profile to change
   * @param updateProfile - an {@link Profile}
   * @return an {@link Observable} to the Profile-response, contains {@link Profile}
   */
  putProfile(id: string, updateProfile: Profile): Observable<Profile> {
    return this.http.put<Profile>(API_URL + `profile/${id}`, { body: updateProfile });
  }

  /**
   * Used to login or send other data to the profile
   * @param id - the id of the user to send to
   * @param body - the body to send, should be { password: xxx }
   * @return an {@link Observable} containing the response
   */
  loginProfile(id: string, body: any): Observable<Profile> {
    return this.http.post<Profile>(API_URL + `profile/${id}`, { body: body })
  }

  /**
   * Used to delete a profile
   * @param id - is the id of the Profile to delete
   * @return an {@link Observable} to the Profile-response, contains {@link Profile}
   */
  deletProfile(id: string): Observable<Profile> {
    return this.http.delete<Profile>(API_URL + `profile/${id}`);
  }

  /**
   * Used to get a singel event
   * @param user - the user to get
   * @return an {@link Observable} to the Event-response, contains {@link Event}
   */
  getEvent(user: string): Observable<Event> {
    return this.http.get<Event>(API_URL + `event/${user}`, { responseType: 'json' });
  }

  /**
   * used to get all events
   * @return an {@link Observable} to the Event-response containing an array of {@link Event}
   */
  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(API_URL + 'event/', { responseType: 'json' });
  }

  /**
   * used to add a new Event
   * @param newInfo - is a {@link Event}
   * @return an {@link Observable} to the Event-response, contains {@link Event}
   */
  postEvent(newInfo: Event): Observable<Event> {
    return this.http.post<Event>(API_URL + 'event/', { body: newInfo });
  }

  /**
   * Used to update an existing user
   * @param id - is the id of the Event to change
   * @param updateEvent - an {@link Event}
   * @return an {@link Observable} to the Event-response, contains {@link Event}
   */
  putEvent(id: string, updateEvent: Event): Observable<Event> {
    return this.http.put<Event>(API_URL + `event/${id}`, { body: updateEvent });
  }

  /**
   * Used to delete a event
   * @param id - is the id of the Event to delete
   * @return an {@link Observable} to the Event-response, contains {@link Event}
   */
  deletEvent(id: string): Observable<Event> {
    return this.http.delete<Event>(API_URL + `event/${id}`);
  }

  /**
   * Used to get a singel meeting
   * @param user - the user to get
   * @return an {@link Observable} to the Meeting-response, contains {@link Meeting}
   */
  getMeeting(user: string): Observable<Meeting> {
    return this.http.get<Meeting>(API_URL + `meeting/${user}`, { responseType: 'json' });
  }

  /**
   * used to get all meetings
   * @return an {@link Observable} to the Meeting-response containing an array of {@link Meeting}
   */
  getMeetings(): Observable<Array<Meeting>> {
    return this.http.get<Array<Meeting>>(API_URL + 'meeting/', { responseType: 'json' });
  }

  /**
   * used to add a new meeting
   * @param newInfo - is a {@link Meeting}
   * @return an {@link Observable} to the Meeting-response, contains {@link Meeting}
   */
  postMeeting(newInfo: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(API_URL + 'meeting/', { body: newInfo });
  }

  postMeetings(newInfo: Array<Meeting>): Observable<Array<Meeting>> {
    return this.http.post<Array<Meeting>>(API_URL + 'meeting/', { body: newInfo });
  }

  /**
   * Used to update an existing user
   * @param id - is the id of the Meeting to change
   * @param updateMeeting - an {@link Meeting}
   * @return an {@link Observable} to the Meeting-response, contains {@link Meeting}
   */
  putMeeting(id: string, updateMeeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(API_URL + `meeting/${id}`, { body: updateMeeting });
  }

  /**
   * Used to delete a meeting
   * @param id - is the id of the Meeting to delete
   * @return an {@link Observable} to the Meeting-response, contains {@link Meeting}
   */
  deletMeeting(id: string): Observable<Meeting> {
    return this.http.delete<Meeting>(API_URL + `meeting/${id}`);
  }


  /**
   * Get a socket-number
   * @return an {@link Observable} that contains the socket-number
   */
  getSocket(): Observable<SocketInterface> {
    return this.http.get<SocketInterface>(API_URL + 'socket/');
  }

  /**
   * Given a socket-number, start a socket on the API and return the number again
   * @param socket - the socket to start
   * @return an {@link Observable} containing the socket-number
   */
  getSpecSocket(eventID: string, socket: string): Observable<SocketInterface> {
    return this.http.get<SocketInterface>(API_URL + `socket/${eventID}/${socket}`);
  }

  /**
   * Close a socket on the API
   * @param socket - is the socket to Close
   * @return an {@link Observable} with true if the socket is closed
   */
  deleteSocket(eventID: string, socket: string): Observable<SocketInterface> {
    return this.http.delete<SocketInterface>(API_URL + `socket/${eventID}/${socket}`);
  }
}
