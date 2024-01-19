import { StorageService } from '@app/shared/services/storage.service';
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { ConversionResponseType, CurrencyRateDisplayType, CurrencyResponseType } from './models/responses';
import { composeExhangeRateString } from '@src/app/utils/string.utils';
import { CurrencySymbolType } from '../models/currency-symbols';

@Injectable({
	providedIn: 'root',
})
export class ExchangeService {
	private apiService = inject(ApiService);
	private storageService = inject(StorageService);

	composeRatesForBaseCurrency(): Observable<CurrencyRateDisplayType[]> {
		return this.apiService.getRatesOnBaseCurrency().pipe(map(rates => composeExhangeRateString(rates, 2)));
	}

	getExchangeRateCurrencies(): Observable<CurrencyResponseType[]> {
		const availableCurrencies = [
			this.storageService.getBaseCurrency(),
			...this.storageService.getExchangeRateCurrencies(),
		];

		return this.apiService
			.getAllCurrencies()
			.pipe(map(response => response.filter(currency => availableCurrencies.includes(currency.short_code))));
	}

	convert(from: CurrencySymbolType, to: CurrencySymbolType, amount: string): Observable<ConversionResponseType> {
		return this.apiService.convert(from, to, amount);
	}
}
