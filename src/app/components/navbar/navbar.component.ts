import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExchangeService } from '@src/app/shared/services/exchange.service';
import { CurrencyResponseType } from '@src/app/shared/services/models/responses';
import { getSingleValue } from '@src/app/utils/common.utils';
import { Observable, map } from 'rxjs';
import { DigitalFractionDialogComponent } from './digital-fraction-dialog/digital-fraction-dialog.component';
import { StorageService } from '@src/app/shared/services/storage.service';

@Component({
	selector: 'exr-navbar',
	standalone: true,
	imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, MatButtonModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
	private exchangeService = inject(ExchangeService);
	private storageService = inject(StorageService);

	protected exchangeRatesForBaseCurrency!: Observable<string[]>;
	protected availableCurrencies!: Observable<CurrencyResponseType[]>;

	constructor(protected dialog: MatDialog) {}

	ngOnInit(): void {
		this.exchangeRatesForBaseCurrency = this.exchangeService
			.composeRatesForBaseCurrency()
			.pipe(map(rates => rates.map(rate => getSingleValue(rate))));
	}

	protected openDialog(): void {
		const dialogRef = this.dialog.open(DigitalFractionDialogComponent, {
			data: { decimalsNumber: this.storageService.getFractionDigits() },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === undefined) return;

			this.storageService.setFractionDigits(result);
		});
	}
}
