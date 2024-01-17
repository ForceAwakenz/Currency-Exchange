import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExchangeControlComponent } from '@app/components/exchange-control/exchange-control.component';
import { ExchangeService } from './shared/services/exchange.service';
import { Observable, map } from 'rxjs';
import { CurrencyType } from './shared/services/models/responses';
import { getSingleValue } from './utils/common.utils';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, ExchangeControlComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	protected exchangeRatesForBaseCurrency!: Observable<string[]>;
	protected availableCurrencies!: Observable<CurrencyType[]>;
	private exchangeService = inject(ExchangeService);

	ngOnInit(): void {
		this.exchangeRatesForBaseCurrency = this.exchangeService
			.composeRatesForBaseCurrency()
			.pipe(map(rates => rates.map(rate => getSingleValue(rate))));

		this.availableCurrencies = this.exchangeService.getAvailableCurrencies();
	}
}
