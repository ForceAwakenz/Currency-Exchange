import { HTTPSuccessResponse } from './models/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONVERT, API_CURRENCIES, API_RATES } from '../constants/api';
import { Observable, map } from 'rxjs';
import { StorageService } from './storage.service';
import { BaseCurrencyRatesResponseType, ConversionResponseType, CurrencyResponseType } from './models/responses';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private http = inject(HttpClient);
	private stogageService = inject(StorageService);

	getRatesOnBaseCurrency(): Observable<BaseCurrencyRatesResponseType> {
		const displayedCurrencies = this.stogageService.getDisplayedCurrencies();

		const baseCurrency = this.stogageService.getBaseCurrency();

		const params = new HttpParams().set('symbols', displayedCurrencies.join(',')).set('base', baseCurrency);

		return this.http
			.get<HTTPSuccessResponse<BaseCurrencyRatesResponseType>>(API_RATES, { params })
			.pipe(map(response => response.response));
	}

	getAllCurrencies(): Observable<CurrencyResponseType[]> {
		return this.http
			.get<HTTPSuccessResponse<CurrencyResponseType[]>>(API_CURRENCIES)
			.pipe(map(response => response.response));
	}

	convert(from: string, to: string, amount: string): Observable<ConversionResponseType> {
		const params = new HttpParams().set('from', from).set('to', to).set('amount', amount);

		return this.http
			.get<HTTPSuccessResponse<ConversionResponseType>>(API_CONVERT, { params })
			.pipe(map(response => response.response));
	}
}
