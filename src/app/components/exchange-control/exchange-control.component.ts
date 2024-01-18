import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChange,
	inject,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyResponseType } from '@src/app/shared/services/models/responses';
import { CommonModule } from '@angular/common';
import { ExchangeForm, ExchangeFormValues, ExtractValuesFromForm } from '@src/app/shared/models/forms';
import { CurrencySymbolType } from '@src/app/shared/models/currency-symbols';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs';
import { isValuesFromExchangeForm } from '@src/app/utils/form.utils';

@Component({
	selector: 'exr-exchange-control',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		ReactiveFormsModule,
	],
	templateUrl: './exchange-control.component.html',
	styleUrl: './exchange-control.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeControlComponent implements OnInit, OnChanges, OnDestroy {
	@Input() label = 'Amount';
	@Input() currencies: CurrencyResponseType[] = [];
	@Input({ required: true }) currencySymbol!: CurrencySymbolType;
	@Input({ required: true }) amount!: string;

	@Output() formUpdated = new EventEmitter<ExchangeFormValues>();

	private cdRef = inject(ChangeDetectorRef);
	private destroyRef$ = new Subject<void>();
	private fb = new FormBuilder();
	protected form!: FormGroup<ExchangeForm>;

	ngOnInit(): void {
		this.buildForm();

		this.formValueChanges().subscribe(formValues => this.formUpdated.emit(formValues));
	}

	ngOnChanges(changes: Record<keyof this, SimpleChange>): void {
		if (changes.currencySymbol || changes.amount) {
			if (this.form) {
				this.form.patchValue({
					currency: this.currencySymbol,
					amount: this.amount,
				});

				this.cdRef.detectChanges();
			}
		}
	}

	ngOnDestroy(): void {
		this.destroyRef$.next();
		this.destroyRef$.complete();
	}

	private buildForm(): void {
		this.form = this.fb.nonNullable.group({
			amount: [this.amount],
			currency: [this.currencySymbol],
		});
	}

	private formValueChanges(): Observable<ExtractValuesFromForm<ExchangeForm>> {
		return this.form.valueChanges.pipe(
			debounceTime(100),
			filter(isValuesFromExchangeForm),
			map(formValues => ({
				...formValues,
				amount: formValues.amount?.replace(/[^0-9.]/g, ''),
			})),
			tap(formValues => {
				this.form.patchValue(formValues);
				this.cdRef.detectChanges();
			}),
			distinctUntilChanged(),
			takeUntil(this.destroyRef$)
		);
	}

	protected onInputClicked(e: MouseEvent): void {
		const target = e.target as HTMLInputElement;
		target.select();
	}
}
