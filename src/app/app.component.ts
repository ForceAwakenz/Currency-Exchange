import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExchangeControlComponent } from '@app/components/exchange-control/exchange-control.component';
import { ExchangeService } from './shared/services/exchange.service';
import { Observable, map } from 'rxjs';
import { ConversionResponseType, CurrencyResponseType } from './shared/services/models/responses';
import { getSingleValue } from './utils/common.utils';
import { AppFormsDataValuesType, ExchangeFormValues } from './shared/models/forms';
import { CURRENCY_SYMBOLS } from './shared/models/currency-symbols';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, ExchangeControlComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	private exchangeService = inject(ExchangeService);

	protected formsData: AppFormsDataValuesType = {};
	protected exchangeRatesForBaseCurrency!: Observable<string[]>;
	protected availableCurrencies!: Observable<CurrencyResponseType[]>;

	ngOnInit(): void {
		this.exchangeRatesForBaseCurrency = this.exchangeService
			.composeRatesForBaseCurrency()
			.pipe(map(rates => rates.map(rate => getSingleValue(rate))));

		this.availableCurrencies = this.exchangeService.getAvailableCurrencies();
		this.fillTheForms();
	}

	//TODO: change initial values generation
	private fillTheForms(): void {
		this.formsData = {
			1: {
				amount: '0',
				currency: CURRENCY_SYMBOLS.UAH,
			},
			2: {
				amount: '0',
				currency: CURRENCY_SYMBOLS.USD,
			},
		};
	}

	protected handleFormUpdate(event: ExchangeFormValues, formOrder: number): void {
		const targetForm = formOrder === 1 ? 2 : 1;

		this.formsData[formOrder] = {
			amount: event.amount,
			currency: event.currency,
		};

		this.exchangeService
			.convert(event.currency!, this.formsData[targetForm].currency!, event.amount!)
			.subscribe((response: ConversionResponseType) => {
				console.warn(response);
				this.formsData[targetForm] = {
					...this.formsData[targetForm],
					amount: response.value.toFixed(4).toString(),
				};
			});
	}
}
