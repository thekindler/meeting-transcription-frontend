import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadAudio(name: string, file: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    console.log(name)
    
    return this.http.post('http://localhost:5000/meeting-transcription/api/upload-audio', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  transcribe(name: string): Observable<any> {
    console.log("reached here on click of transcribe")
    var formData: any = new FormData();
    formData.append("name", name);

    return this.http.get('http://localhost:5000/meeting-transciption/api/transcribe?filename=abc&nspeakers=2', {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}