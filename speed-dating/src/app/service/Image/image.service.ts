import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants';
/**
 * Uploads a image to aws and gets the url back
 * @author anton byström
 */

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private localUrl = AppConstants.localURL;
  private herokuUrl = AppConstants.herokuURL;

  constructor(private http: HttpClient) { }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    const url = `${this.herokuUrl}imageUpload`;
    return this.http.post<any>(url, formData);
  }
}
