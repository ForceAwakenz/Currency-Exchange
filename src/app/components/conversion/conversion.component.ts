/* eslint-disable curly */
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map, switchMap, filter, debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppFormsDataValuesType, ConvertPropsType } from '@src/app/shared/models/forms';
import { CURRENCY_SYMBOLS } from '@src/app/shared/models/currency-symbols';
import { ExchangeService } from '@src/app/shared/services/exchange.service';
import { StorageService } from '@src/app/shared/services/storage.service';
import { getTarget } from '@src/app/utils/number.utils';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ConversionResponseType, CurrencyResponseType } from '@src/app/shared/services/models/responses';

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
	selector: 'exr-conversion',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule],
	templateUrl: './conversion.component.html',
	styleUrl: './conversion.component.scss',
})
export class ConversionComponent implements OnInit {
	private destroyRef$ = inject(DestroyRef);
	private exchangeService = inject(ExchangeService);
	private storageService = inject(StorageService);
	private fb = new FormBuilder();
	private initiator!: 1 | 2;
	private currentFormValues!: AppFormsDataValuesType;

	protected form!: FormGroup;
	protected availableCurrencies!: Observable<CurrencyResponseType[]>;

	ngOnInit(): void {
		this.availableCurrencies = this.exchangeService.getExchangeRateCurrencies();
		this.currentFormValues = initValues;

		this.buildForm();
		this.formValueChanges().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe(this.handleUpdates);
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

	private formValueChanges(): Observable<ConversionResponseType> {
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

				if (isNaN(+newValue[this.initiator].amount)) {
					this.form.controls[this.initiator].patchValue(
						{ amount: this.currentFormValues[this.initiator].amount },
						{ emitEvent: false }
					);
					return null;
				}

				return {
					from: newValue[this.initiator].currency,
					to: newValue[target].currency,
					amount: newValue[this.initiator].amount,
				};
			}),
			filter(Boolean),
			debounceTime(300),
			switchMap(props => this.exchangeService.convert(props.from, props.to, props.amount))
		);
	}

	private handleUpdates = (response: ConversionResponseType): void => {
		const updatedValue = {
			...this.form.value,
			[getTarget(this.initiator)]: {
				amount: response.value.toFixed(this.storageService.getFractionDigits()),
				currency: response.to,
			},
		};

		this.currentFormValues = updatedValue;

		this.form.patchValue(updatedValue, { emitEvent: false });
	};

	protected onInputClicked(e: MouseEvent): void {
		const target = e.target as HTMLInputElement;
		target.select();
	}
}
