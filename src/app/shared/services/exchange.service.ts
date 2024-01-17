import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, filter, map, tap } from 'rxjs';
import { BaseCurrencyRatesResponseType, CurrencyRateDisplayType } from './models/responses';
import { HTTPSuccessResponse } from './models/http';
import { formatRateForDisplay } from '@src/app/utils/number.utils';

@Injectable({
	providedIn: 'root',
})
export class ExchangeService {
	private apiService = inject(ApiService);

	/**
	 * composeRatesForBaseCurrency fetches the base currency rates and transforms them into an array of 'EUR/UAH: 42.22' type of strings.
	 * @returns An Observable that emits an array of CurrencyRateDisplayType.
	 */
	composeRatesForBaseCurrency(): Observable<CurrencyRateDisplayType[]> {
		return this.apiService.getRatesOnBaseCurrency().pipe(
			filter(
				(response): response is HTTPSuccessResponse<BaseCurrencyRatesResponseType> => response.meta.code === 200
			),
			map(response => response.response),
			map(response =>
				Object.entries(response.rates).reduce<CurrencyRateDisplayType[]>(
					(acc, curr) => [
						...acc,
						{ [curr[0]]: `${curr[0]}/${response.base}: ${formatRateForDisplay(curr[1])}` },
					],
					[]
				)
			)
		);
	}
}
