import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadService = TestBed.get(UploadService);
    expect(service).toBeTruthy();
  });
});
