import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_RATES } from '../constants/api';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private http = inject(HttpClient);

	getAllRates(): Observable<any> {
		return this.http.get(`${API_RATES}`);
	}
}
