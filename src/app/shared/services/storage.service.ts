import { Injectable } from '@angular/core';
import {
	DEFAULT_BASE_CURRENCY,
	DEFAULT_CONVERSION_CURRENCIES,
	DEFAULT_EXCHANGE_CURRENCIES,
} from './constants/default-displayed-currencies';
import { CurrencySymbolType } from '../models/currency-symbols';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	//TODO: create setDisplayedCurrencies method and functionality
	getExchangeRateCurrencies(): CurrencySymbolType[] {
		const storedCurrencies = localStorage.getItem('exchangeRateCurrencies');
		return storedCurrencies ? JSON.parse(storedCurrencies) : DEFAULT_EXCHANGE_CURRENCIES;
	}

	getConversionCurrencies(): CurrencySymbolType[] {
		const storedCurrencies = localStorage.getItem('conversionCurrencies');
		return storedCurrencies ? JSON.parse(storedCurrencies) : DEFAULT_CONVERSION_CURRENCIES;
	}

	getBaseCurrency(): CurrencySymbolType {
		const storedCurrencies = localStorage.getItem('baseCurrency');
		return storedCurrencies ? JSON.parse(storedCurrencies) : DEFAULT_BASE_CURRENCY;
	}

	getFractionDigits(): number {
		const storedFractionDigits = localStorage.getItem('fractionDigits');
		return storedFractionDigits ? JSON.parse(storedFractionDigits) : 2;
	}

	setFractionDigits(fractionDigits: number): void {
		localStorage.setItem('fractionDigits', JSON.stringify(fractionDigits));
	}
}
