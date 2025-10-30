import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Shapefile {

  private apiUrl = 'http://localhost:8888/api/upload';

  constructor(private http: HttpClient) {}

  uploadZip(file: File): Observable<any>{
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<any>(this.apiUrl, fd);
  }
  
}
