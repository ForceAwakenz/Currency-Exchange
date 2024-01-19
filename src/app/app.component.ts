/* eslint-disable curly */
import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExchangeService } from './shared/services/exchange.service';
import { Observable, Subject, map, switchMap, filter, debounceTime } from 'rxjs';
import { ConversionResponseType, CurrencyResponseType } from './shared/services/models/responses';
import { getSingleValue } from './utils/common.utils';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CURRENCY_SYMBOLS } from './shared/models/currency-symbols';
import { AppFormsDataValuesType, ConvertPropsType } from './shared/models/forms';
import { getTarget } from './utils/number.utils';

const initValues: AppFormsDataValuesType = {
	1: {
		amount: '0',
		currency: CURRENCY_SYMBOLS.USD,
	},
	2: {
		amount: '0',
		currency: CURRENCY_SYMBOLS.UAH,
	},
};

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	private destroyRef$ = inject(DestroyRef);
	private exchangeService = inject(ExchangeService);
	private fb = new FormBuilder();
	private initiator!: 1 | 2;
	private currentFormValues!: AppFormsDataValuesType;

	protected exchangeRatesForBaseCurrency!: Observable<string[]>;
	protected availableCurrencies!: Observable<CurrencyResponseType[]>;
	protected form!: FormGroup;

	ngOnInit(): void {
		this.exchangeRatesForBaseCurrency = this.exchangeService
			.composeRatesForBaseCurrency()
			.pipe(map(rates => rates.map(rate => getSingleValue(rate))));

		this.availableCurrencies = this.exchangeService.getExchangeRateCurrencies();
		this.currentFormValues = initValues;

		this.buildForm();
		this.formValueChange$()
			.pipe(takeUntilDestroyed(this.destroyRef$))
			.subscribe(response => {
				console.warn('response', response);

				const updatedValue = {
					...this.form.value,
					[getTarget(this.initiator)]: { amount: response.value },
				};

				this.currentFormValues = updatedValue;

				this.form.patchValue(updatedValue, { emitEvent: false });
			});
	}

	protected onInputClicked(e: MouseEvent): void {
		const target = e.target as HTMLInputElement;
		target.select();
	}

	private buildForm(): void {
		//TODO: add logic for currency symbols display
		this.form = this.fb.group({
			1: this.fb.group({
				amount: [initValues[1].amount],
				currency: [initValues[1].currency],
			}),
			2: this.fb.group({
				amount: [initValues[2].amount],
				currency: [initValues[2].currency],
			}),
		});
	}

	private formValueChange$(): Observable<ConversionResponseType> {
		return this.form.valueChanges.pipe(
			map((newValue: AppFormsDataValuesType): ConvertPropsType | null => {
				// We compare the current form values with the new ones to determine which field was updated by user

				for (const key in this.currentFormValues) {
					if (
						this.currentFormValues[key].amount !== newValue[key].amount ||
						this.currentFormValues[key].currency !== newValue[key].currency
					) {
						this.initiator = Number(key) as 1 | 2;
						break;
					}
				}

				if (!this.initiator) return null;

				const target = getTarget(this.initiator);

				return {
					from: newValue[this.initiator].currency,
					to: newValue[target].currency,
					amount: newValue[this.initiator].amount,
				};
			}),
			filter(Boolean),
			debounceTime(300),
			switchMap(props => this.exchangeService.convert(props.from, props?.to, props?.amount))
		);
	}
}
