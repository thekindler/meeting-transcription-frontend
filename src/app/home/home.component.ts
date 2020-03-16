import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { ElementRef } from '@angular/core';
import { HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { FileUploadService } from "../upload.service";
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms"
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public show:boolean = false;
  quote: string | undefined;
  isLoading = false;
  
  form: FormGroup;
  progress: number = 0;
  transcript: string;

  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService
  ) {
    this.form = this.fb.group({
      name: [''],
      file: [null],
      nspeakers : String
    })
  }

  ngOnInit() { 
  }

  uploadFile(event) {
    const File = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      file: File
    });
    console.log(this.form.get('name'))
    console.log("nspeakers",this.form.get('nspeakers'))
    this.form.get('file').updateValueAndValidity()
  }

  uploadAudio() {
    this.fileUploadService.uploadAudio(
      this.form.value.name,
      this.form.value.file
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    })
  }
  transcribe(event) {

    this.fileUploadService.transcribe(
      this.form.value.name,
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Audio Succesfully Transcribed', event.body);
          this.show = true
          this.transcript = event.body
        
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    })

  }

}
