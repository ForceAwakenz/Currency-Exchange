import { Injectable } from '@angular/core';
import { DEFAULT_BASE_CURRENCY, DEFAULT_DISPLAYED_CURRENCIES } from './constants/default-displayed-currencies';
import { CurrencySymbolType } from '../models/currency-symbols';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	//TODO: create setDisplayedCurrencies method and functionality
	getDisplayedCurrencies(): CurrencySymbolType[] {
		const storedCurrencies = localStorage.getItem('displayedCurrencies');
		return storedCurrencies ? JSON.parse(storedCurrencies) : DEFAULT_DISPLAYED_CURRENCIES;
	}

	getBaseCurrency(): CurrencySymbolType {
		const storedCurrencies = localStorage.getItem('baseCurrency');
		return storedCurrencies ? JSON.parse(storedCurrencies) : DEFAULT_BASE_CURRENCY;
	}
}
