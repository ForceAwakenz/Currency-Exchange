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
import { ExchangeForm, ExchangeFormValues } from '@src/app/shared/models/forms';
import { CurrencySymbolType } from '@src/app/shared/models/currency-symbols';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

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
	@Input() currencySymbol!: CurrencySymbolType;
	@Input() amount!: string;

	@Output() formUpdated = new EventEmitter<ExchangeFormValues>();

	private cdRef = inject(ChangeDetectorRef);
	private destroyRef$ = new Subject<void>();
	private fb = new FormBuilder();
	protected form!: FormGroup<ExchangeForm>;

	ngOnInit(): void {
		this.buildForm();
		this.form.valueChanges
			.pipe(debounceTime(200), takeUntil(this.destroyRef$))
			.subscribe(formValues => this.formUpdated.emit(formValues));
	}

	// FIXME: to find a better way to update the form values
	ngOnChanges(changes: Record<keyof this, SimpleChange>): void {
		if (changes.currencySymbol || changes.amount) {
			if (+changes.amount?.currentValue - +changes.amount?.previousValue > 0.01) return;
			if (this.form) {
				this.form.patchValue({
					currency: this.currencySymbol,
					amount: this.amount,
				});
				this.cdRef.markForCheck();
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

	protected onInputClicked(e: MouseEvent): void {
		const target = e.target as HTMLInputElement;
		target.select();
	}
}
