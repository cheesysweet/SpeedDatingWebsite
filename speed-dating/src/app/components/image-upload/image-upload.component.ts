import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { base64ToFile } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Profile } from 'src/app/Interfaces/Profile';
import { ImageService } from '../../service/Image/image.service';
import { MatDialog } from '@angular/material/dialog';

/**
 * Uploads a image to aws and gets the url back
 * @author anton byström
 */

// local class for sending image
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() profile: Profile | null = null; // profile
  @Output() ifCrop = new EventEmitter<boolean>(); // if image croping is active

  @ViewChild("imageInput", {static: false})
  InputVar: ElementRef | undefined;

  cropImage: boolean = false; // if image croping is active
  image!: ImageSnippet; // loading circle
  imageChangedEvent: any; // image to crop
  croppedImage: any; // croped image

  constructor(private imageService: ImageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * removes loading circle
   */
  private onSuccess() {
    this.image.pending = false;
    this.image.status = 'ok';
  }

  /**
   * displays loading circle
   */
  private onError() {
    this.image.pending = false;
    this.image.status = 'fail';
    this.image.src = '';
  }

  /**
   * uploads file to fileserver
   * @param file file to upload
   */
  onFileSelected(file: any) {
    const reader = new FileReader();


    reader.addEventListener('load', (event: any) => {
      this.image = new ImageSnippet(event.target.result, file)

      this.image.pending = true;
      this.imageService.uploadImage(this.image.file).subscribe(
        (res) => {
          if (this.profile !== null)  {
            console.log(res.imageUrl)
            this.onSuccess();
            this.profile.picture = res.imageUrl; // return of url
            this.cropImage = false;
            this.updateParent();
          }          
        },
        (err) => {
          this.onError();
        }
      )
    })

    reader.readAsDataURL(file);
  }

  /**
   * Image to crop
   * @param event current file
   */
  fileChangeEvent(event: any) {
    this.cropImage = true;
    this.updateParent();
    this.imageChangedEvent = event;
  }

  /**
   * gets croped image
   * @param event croped image
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
  }

  /**
   * transforms image to faile
   */
  saveImage() {
    const imageFile = new File(
      [base64ToFile(this.croppedImage)], 
      this.imageChangedEvent.target.files[0].name,
      { type: 'image/png' })
      
    this.onFileSelected(imageFile);
    this.InputVar!.nativeElement.value = "";
  }

  cancel() {
    this.cropImage = false;
    this.updateParent();
    this.InputVar!.nativeElement.value = "";
  }

  /**
   * converst 64bit image string to blob 
   * @param dataURI 64bit image
   * @returns blob of 64bit image
   */
  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

 /**
  * boolean to hide elements
  */
 updateParent() {
  this.ifCrop.emit(this.cropImage);
 }
}
