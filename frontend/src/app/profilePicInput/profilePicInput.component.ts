import {Component, ElementRef, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import index from '@angular/cli/lib/cli';
import {ActivatedRoute, Router} from '@angular/router';

export interface IMedia {
  id?: number;
  originalFileName?: string;
  contentType?: string;
  size?: number;
}
//frontend
@Component({
  selector: 'app-profilePicInput',
  templateUrl: './profilePicInput.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfilePicInputComponent),
      multi: true
    }
  ]
})
export class ProfilePicInputComponent implements OnInit, ControlValueAccessor {
  resourceUrl = '/api/media';
  name: string;
  medias: IMedia[];
  previews = [];
  uploader: FileUploader;
  onChange = (medias: IMedia[]) => {
    // empty default
  }


  constructor(private userService: UserService, private http: HttpClient, elm: ElementRef) {
    this.name = elm.nativeElement.getAttribute('name');
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.resourceUrl,
      authToken: 'Bearer ' + localStorage.getItem(this.userService.accessTokenLocalStorageKey),
      autoUpload: true
    });
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      if (!this.medias) {
        this.medias = [];
      }
      
      this.medias.push({
        contentType: item.file.type,
        originalFileName: item.file.name,
        size: item.file.size
      });
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const uploadedMedia = <IMedia>JSON.parse(response);
      this.medias.find(media => !media.id && media.originalFileName === uploadedMedia.originalFileName).id = uploadedMedia.id;
      this.initPreviews();
    };
    this.uploader.onCompleteAll = () => {
      this.onChange(this.medias);
    };
  }

  deleteMedia(index: number): void {
    this.medias.splice(index, 1);
    this.onChange(this.medias);
    delete this.previews[index];
  }

  initPreviews(){
    if(this.medias){
      this.medias.forEach((media, index) =>{
        if(media.id && !this.previews[index]){
          this.http.get(`${this.resourceUrl}/${media.id }`, {responseType: 'blob'}).subscribe((blob: Blob) => {
            const fileURL = URL.createObjectURL(blob);
            this.previews[index] = fileURL;
          });
        }
      });
    }
  }

  showMedia(media: IMedia): void{
    this.http.get(`${this.resourceUrl}/${media.id}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const fileURL = URL.createObjectURL(blob);
      const img = <HTMLImageElement>document.createElement('img');
      img.src = fileURL;
      document.body.appendChild(img);
      img.click();

    });
  }

  downloadMedia(media: IMedia): void {
    this.http.get(`${this.resourceUrl}/${media.id}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const fileURL = URL.createObjectURL(blob);
      const a = <HTMLAnchorElement>document.createElement('a');
      a.href = fileURL;
      a.download = media.originalFileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // not implemented
  }

  setDisabledState(isDisabled: boolean): void {
    // not implemented
  }

  writeValue(obj: any): void {
    this.medias = obj;
    this.onChange(obj);
    this.initPreviews();
  }
}
