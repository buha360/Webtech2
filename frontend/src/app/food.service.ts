import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class FoodService {
   private baseUrl = 'http://localhost:3000/foods';

   constructor(private http: HttpClient) {}

   getFoods(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl);
   }
}
