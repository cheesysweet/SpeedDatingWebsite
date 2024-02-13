/**
 * constant values used in the project
 */

export class AppConstants {

    public static get local(): string { return 'localhost' }
    /**
     * url connection strings
     */
    // local api connection url
    public static get localURL(): string { return "http://localhost:3000/api/"; }
    public static get localWS(): string { return "ws://localhost"; }
    // heroku api connection url
    public static get herokuURL(): string { return "https://dt198g-speed-dating.herokuapp.com/api/"; }
    // mongoDB connection url
    public static get mongoDB(): string { return "mongodb+srv://miunStudentAnton:studentCloud@dt190g.lpdi2.mongodb.net/Speed-Dating/"; }

    /**
     * socket
     */
    // socket prot
    public static get socketPort(): number { return 12345; }
}
