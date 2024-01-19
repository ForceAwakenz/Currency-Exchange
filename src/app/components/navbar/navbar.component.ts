import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExchangeService } from '@src/app/shared/services/exchange.service';
import { CurrencyResponseType } from '@src/app/shared/services/models/responses';
import { getSingleValue } from '@src/app/utils/common.utils';
import { Observable, map } from 'rxjs';

@Component({
	selector: 'exr-navbar',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
	private exchangeService = inject(ExchangeService);

	protected exchangeRatesForBaseCurrency!: Observable<string[]>;
	protected availableCurrencies!: Observable<CurrencyResponseType[]>;

	ngOnInit(): void {
		this.exchangeRatesForBaseCurrency = this.exchangeService
			.composeRatesForBaseCurrency()
			.pipe(map(rates => rates.map(rate => getSingleValue(rate))));
	}
}
