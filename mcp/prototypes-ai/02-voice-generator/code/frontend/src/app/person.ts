import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BiographyResponse {
  success: boolean
  llm: string
  data: string
  audioUrl?: string
}

@Injectable({ providedIn: 'root' })
export class Person {
  private baseUrl = 'http://localhost:3000/api/ai';

  constructor(private http: HttpClient) { }

  postBiography(llm: string, name: string, length: string, style: string): Observable<BiographyResponse> {
    return this.http.post<BiographyResponse>(
      `${this.baseUrl}/biography/${llm}`,
      { name, length, style },
    );
  }

  postVoice(llm: string, name: string, length: string, style: string): Observable<BiographyResponse> {
    return this.http.post<BiographyResponse>(
      `${this.baseUrl}/voice/${llm}`,
      { name, length, style },
    );
  }
}
