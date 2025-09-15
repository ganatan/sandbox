import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class PersonService {
  constructor(private http: HttpClient) {}

  getBiography(name: string): Observable<string> {
    return this.http.get(`http://localhost:3000/person/${name}`, { responseType: 'text' })
  }
}
