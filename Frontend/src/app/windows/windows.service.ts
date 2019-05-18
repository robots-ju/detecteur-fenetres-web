import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WindowsService {
  constructor(private http: HttpClient) { }

  getWindowsList() {
    return this.http.get('http://192.168.1.138:8080/api/windows');
  }
}


