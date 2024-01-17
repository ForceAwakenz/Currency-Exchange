import { HTTPSuccessResponse } from './models/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_RATES } from '../constants/api';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { BaseCurrencyRatesResponseType } from './models/responses';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private http = inject(HttpClient);
	private stogageService = inject(StorageService);

	getRatesOnBaseCurrency(): Observable<HTTPSuccessResponse<BaseCurrencyRatesResponseType>> {
		const displayedCurrencies = this.stogageService.getDisplayedCurrencies();
		const baseCurrency = this.stogageService.getBaseCurrency();

		const params = new HttpParams().set('symbols', displayedCurrencies.join(',')).set('base', baseCurrency);

		return this.http.get<HTTPSuccessResponse<BaseCurrencyRatesResponseType>>(`${API_RATES}`, { params });
	}
}
